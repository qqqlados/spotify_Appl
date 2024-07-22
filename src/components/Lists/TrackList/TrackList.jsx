import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import TrackItem from './TrackItem'
import styles from './TrackList.module.scss'
import LoaderCircle from '/src/components/Loader/LoaderCircle'

const TrackList = ({ tracks, images, areTracksRecommendations, addTrack, short }) => {
	const [mutationAction, setMutationAction] = useState(null)

	const [expandedList, setExpandedList] = useState(false)

	const [updatedOrder, setUpdatedOrder] = useState({
		tracks,
		images,
	})

	useEffect(() => {
		if (mutationAction && mutationAction.toString().startsWith('spotify')) {
			const updatedTracks = updatedOrder.tracks.filter(item => item?.uri !== mutationAction)
			const updatedImages = updatedOrder.images.filter((_, index) => updatedOrder.tracks[index]?.uri !== mutationAction)
			setUpdatedOrder({ tracks: updatedTracks, images: updatedImages })
		}
	}, [mutationAction])

	const additionalProps = {
		areTracksRecommendations,
		addTrackAction: addTrack,
		setMutation: setMutationAction,
		tracks: addTrack ? updatedOrder.tracks : tracks,
		images: addTrack ? updatedOrder.images : images,
	}

	const tracksToMap = addTrack ? updatedOrder.tracks : short ? (expandedList ? tracks : tracks.slice(0, 5)) : tracks

	return (
		<>
			<ul className={clsx(styles.list, expandedList && styles.expanded)}>
				{tracksToMap.map((track, index) => (
					<li key={track.id}>
						<TrackItem id={track.id} trackUri={track.uri} track={track} index={index} additionalProps={additionalProps} />
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
