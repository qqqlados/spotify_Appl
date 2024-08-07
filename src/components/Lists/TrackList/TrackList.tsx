import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { IImage } from '../../../shared/types/image.type'
import { ITrack } from '../../../types/track.types'
import LoaderCircle from '../../Loader/LoaderCircle'
import TrackItem from './TrackItem'
import styles from './TrackList.module.scss'

type TrackListProps = {
	tracks: ITrack[]
	images: IImage[]
	addTrack?: boolean
	short?: boolean
}

const TrackList = ({ tracks, images, addTrack, short }: TrackListProps) => {
	const [mutationAction, setMutationAction] = useState<string | null | boolean>(null)

	const [expandedList, setExpandedList] = useState(false)

	const [updatedOrder, setUpdatedOrder] = useState({
		tracks,
		images,
	})

	useEffect(() => {
		if (typeof mutationAction === 'string' && mutationAction.startsWith('spotify')) {
			const updatedTracks = updatedOrder.tracks.filter(item => item?.uri !== mutationAction)
			const updatedImages = updatedOrder.images.filter((_, index) => updatedOrder.tracks[index]?.uri !== mutationAction)
			setUpdatedOrder({ tracks: updatedTracks, images: updatedImages })
		}
	}, [mutationAction])

	const tracksToMap = addTrack ? updatedOrder.tracks : short ? (expandedList ? tracks : tracks.slice(0, 5)) : tracks

	return (
		<>
			<ul className={clsx(styles.list, expandedList && styles.expanded)}>
				{tracksToMap?.map((track, index) => (
					<li key={track.id}>
						<TrackItem
							id={track.id}
							trackUri={track.uri}
							track={track}
							index={index}
							images={images}
							setMutation={setMutationAction}
							addTrackAction={addTrack}
						/>
					</li>
				))}
				{mutationAction === 'start' && <LoaderCircle />}
			</ul>
			{short && tracks.length > 5 && (
				<div className={clsx(styles.btn_more, expandedList && styles.position)} onClick={() => setExpandedList(prev => !prev)}>
					<span>{expandedList ? 'hide' : 'more ...'}</span>
				</div>
			)}
		</>
	)
}

export default TrackList
