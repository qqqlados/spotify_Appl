import clsx from 'clsx'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import TrackItem from './TrackItem'
import styles from './TrackList.module.scss'

const TrackList = ({ tracks, images, areTracksRecommendations, addTrack, reorder, handleOnDragEnd, tracksOrder, imagesOrder }) => {
	const tracksToMap = reorder ? tracksOrder : tracks
	const imagesToMap = reorder ? imagesOrder : images

	return (
		<>
			{reorder ? (
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId='tracks'>
						{provided => (
							<ul className={clsx(styles.list, reorder && styles.reorder)} {...provided.droppableProps} ref={provided.innerRef}>
								{tracksToMap?.map((track, index) => (
									<Draggable key={track.id} draggableId={track.id} index={index}>
										{provided => (
											<li {...provided.draggableProps} ref={provided.innerRef} key={track.id}>
												<TrackItem
													id={track.id}
													trackUri={track.uri}
													track={track}
													images={imagesToMap}
													index={index}
													areTracksRecommendations={areTracksRecommendations}
													addTrackAction={addTrack}
													reorder={reorder}
													dragHandleProps={provided.dragHandleProps}
												/>
											</li>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
			) : (
				<ul className={clsx(styles.list, reorder && styles.reorder)}>
					{tracks?.map((track, index) => (
						<li key={track.id}>
							<TrackItem
								id={track.id}
								trackUri={track.uri}
								track={track}
								images={images}
								index={index}
								areTracksRecommendations={areTracksRecommendations}
								addTrackAction={addTrack}
							/>
						</li>
					))}
				</ul>
			)}
		</>
	)
}

export default TrackList
