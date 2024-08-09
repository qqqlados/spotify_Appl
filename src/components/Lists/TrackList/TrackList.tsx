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

	const [updatedOrder, setUpdatedOrder] = useState(tracks)

	useEffect(() => {
		if (typeof mutationAction === 'string' && mutationAction.startsWith('spotify')) {
			const updatedTracks = updatedOrder.filter(item => item?.uri !== mutationAction)
			setUpdatedOrder(updatedTracks)
		}
	}, [mutationAction])

	const tracksToMap = addTrack ? updatedOrder : short ? (expandedList ? tracks : tracks.slice(0, 5)) : tracks

	const updatedImages = updatedOrder?.map(track => track?.album?.images[1])

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
							images={updatedImages}
							setMutation={setMutationAction}
							addTrackAction={addTrack}
						/>
					</li>
				))}
				{mutationAction === 'loader circle started' && <LoaderCircle />}
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
