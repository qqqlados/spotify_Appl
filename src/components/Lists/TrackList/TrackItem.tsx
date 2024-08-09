import clsx from 'clsx'
import { useState } from 'react'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddTrack } from '../../../hooks/useTrack'
import { timeConverter } from '../../../shared/TimeConverter'
import { IImage } from '../../../shared/types/image.type'
import { ITrack } from '../../../types/track.types'
import ModalsRoot from '../../Modals/ModalsRoot'
import { AddButton, IconDnd, ThreeDotsOptions } from '../../SmallElements/smallElements'
import styles from './TrackList.module.scss'

type TrackItemProps = {
	id: string
	trackUri: string
	track: ITrack
	index: number
	images: IImage[]
	reorder?: boolean
	addTrackAction?: boolean
	setMutation?: React.Dispatch<React.SetStateAction<boolean | string | null>>
	dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined
}

const TrackItem = ({ id, trackUri, track, index, images, reorder, addTrackAction, dragHandleProps, setMutation }: TrackItemProps) => {
	const artistName = track?.artists?.map(artist => artist.name)[0]

	const { playlist_id } = useParams()

	const [modalOptions, setModalOptions] = useState(false)

	const navigate = useNavigate()

	const { checkPlaylistTracks } = useAddTrack({
		playlist_id,
		id,
		trackUri,
		setLoaderCircle: setMutation,
	})

	const { formatTime } = timeConverter()

	const handleClick = () => {
		if ((!reorder && !addTrackAction) || (reorder && !addTrackAction)) {
			navigate(`/track/${id}`)
		}
	}

	const handleCheckTracks = (e: React.MouseEvent<HTMLDivElement>) => {
		if (setMutation) setMutation('start')
		e.stopPropagation()
		checkPlaylistTracks()
	}

	const formattedTime = formatTime(track.duration_ms).substring(2, 7)

	return (
		<div
			className={clsx(styles.track, reorder && styles.reorder, reorder && styles.track_cursor_default, addTrackAction && styles.track_cursor_default)}
			onClick={handleClick}
		>
			<div className={styles.order}>
				<span>{index + 1}</span>
			</div>

			{images && images.length > 1 && (
				<div className={styles.image}>
					{images[index] ? <img src={images[index]?.url} alt='Track cover' /> : <img src='/src/shared/assets/imgs/music-note-2-svgrepo-com.svg' />}
				</div>
			)}

			<div className={styles.content}>
				<div className={styles.info}>
					<p className={styles.name}>{track?.name}</p>

					<div className={styles.artist}>
						<p>{artistName}</p>
					</div>
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
		</div>
	)
}

export default TrackItem
