import clsx from 'clsx'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddTrack } from '../../../hooks/useTrack'
import { timeConverter } from '../../../shared/TimeConverter'
import LoaderFullScreen from '../../Loader/LoaderFullScreen'
import ModalsRoot from '../../Modals/ModalsRoot'
import AddButton from '../../SmallElements/AddButton/AddButton'
import ThreeDotsOptions from '../../SmallElements/ThreeDotsOptions/ThreeDotsOptions'
import styles from './TrackList.module.scss'
import IconDnd from '/src/components/SmallElements/DragAndDropSymbol/IconDnd'

const TrackItem = ({ id, trackUri, track, images, index, areTracksRecommendations, addTrackAction, reorder, dragHandleProps }) => {
	const artistName = track?.artists?.map(artist => artist.name)[0]

	const { playlist_id } = useParams()

	const [modalOptions, setModalOptions] = useState(false)

	const navigate = useNavigate()

	const { checkPlaylistTracks, isLoadingAddTrack } = useAddTrack(playlist_id, id, trackUri)

	const { formatTime } = timeConverter()

	const handleClick = () => {
		if (!reorder) {
			navigate(`/track/${id}`)
		}
	}

	const handleCheckTracks = e => {
		e.stopPropagation()
		checkPlaylistTracks()
	}

	const formattedTime = formatTime(track.duration_ms).substring(2, 7)

	return (
		<div className={clsx(styles.track, reorder && styles.reorder, reorder && styles.track_cursor_default)} onClick={handleClick}>
			<div className={styles.order}>
				<span>{index + 1}</span>
			</div>

			<div className={styles.image}>{images.length > 1 ? <img src={images[index]?.url} alt='Track cover' /> : ''}</div>

			<div className={styles.content}>
				<div className={styles.info}>
					<p className={styles.name}>{track?.name}</p>

					<div className={styles.artist}>
						<p>{artistName}</p>
					</div>
					{areTracksRecommendations?.length < 10 ? <p>{track?.album?.name}</p> : ''}
				</div>

				<div className={styles.album}>
					<span>{track?.album?.name}</span>
				</div>

				<div className={styles.duration}>{formattedTime}</div>
			</div>

			<div className={styles.additional}>
				{reorder ? (
					<div {...dragHandleProps}>
						<IconDnd />
					</div>
				) : addTrackAction ? (
					<AddButton handleFunction={handleCheckTracks} />
				) : (
					<div className={styles.options} onClick={e => e.stopPropagation()}>
						<ThreeDotsOptions setModalOptions={setModalOptions} />

						<ModalsRoot track_id={id} trackUri={trackUri} modalOptions={modalOptions} setModalOptions={setModalOptions} />
					</div>
				)}
			</div>

			{isLoadingAddTrack && <LoaderFullScreen />}
		</div>
	)
}

export default TrackItem
