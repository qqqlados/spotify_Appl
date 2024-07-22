import clsx from 'clsx'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddTrack } from '../../../hooks/useTrack'
import { timeConverter } from '../../../shared/TimeConverter'
import ModalsRoot from '../../Modals/ModalsRoot'
import { AddButton, IconDnd, ThreeDotsOptions } from '../../SmallElements/smallElements'
import styles from './TrackList.module.scss'

const TrackItem = ({ id, trackUri, track, index, dragHandleProps, additionalProps }) => {
	const artistName = track?.artists?.map(artist => artist.name)[0]

	const { playlist_id } = useParams()

	const [modalOptions, setModalOptions] = useState(false)

	const navigate = useNavigate()

	const { checkPlaylistTracks } = useAddTrack(playlist_id, id, trackUri, additionalProps.setMutation)

	const { formatTime } = timeConverter()

	const handleClick = () => {
		if (!additionalProps.reorder && !additionalProps.addTrackAction) {
			navigate(`/track/${id}`)
		}
	}

	const handleCheckTracks = e => {
		additionalProps.setMutation('start')
		e.stopPropagation()
		checkPlaylistTracks()
	}

	const formattedTime = formatTime(track.duration_ms).substring(2, 7)

	return (
		<div
			className={clsx(
				styles.track,
				additionalProps.reorder && styles.reorder,
				additionalProps.reorder && styles.track_cursor_default,
				additionalProps.addTrackAction && styles.track_cursor_default
			)}
			onClick={handleClick}
		>
			<div className={styles.order}>
				<span>{index + 1}</span>
			</div>

			<div className={styles.image}>
				{additionalProps.images.length > 1 ? <img src={additionalProps.images[index]?.url} alt='Track cover' /> : ''}
			</div>

			<div className={styles.content}>
				<div className={styles.info}>
					<p className={styles.name}>{track?.name}</p>

					<div className={styles.artist}>
						<p>{artistName}</p>
					</div>
					{additionalProps.areTracksRecommendations?.length < 10 ? <p>{track?.album?.name}</p> : ''}
				</div>

				<div className={styles.album}>
					<span>{track?.album?.name}</span>
				</div>

				<div className={styles.duration}>{formattedTime}</div>
			</div>

			<div className={styles.additional}>
				{additionalProps.reorder ? (
					<div {...dragHandleProps}>
						<IconDnd />
					</div>
				) : additionalProps.addTrackAction ? (
					<AddButton handleFunction={handleCheckTracks} />
				) : (
					<div className={styles.options} onClick={e => e.stopPropagation()}>
						<ThreeDotsOptions setModalOptions={setModalOptions} />

						<ModalsRoot track_id={id} trackUri={trackUri} modalOptions={modalOptions} setModalOptions={setModalOptions} />
					</div>
				)}
			</div>
		</div>
	)
}

export default TrackItem
