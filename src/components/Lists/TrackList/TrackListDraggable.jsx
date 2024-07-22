import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import TrackItem from './TrackItem'
import styles from './TrackList.module.scss'

const TrackListDraggable = ({ tracksOrder, imagesOrder, areTracksRecommendations, addTrack, handleOnDragEnd }) => {
	const additionalProps = {
		reorder: true,
		images: imagesOrder,
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId='tracks'>
				{provided => (
					<ul className={`${styles.list} ${styles.reorder}`} {...provided.droppableProps} ref={provided.innerRef}>
						{tracksOrder?.map((track, index) => (
							<Draggable key={track.id} draggableId={track.id} index={index}>
								{provided => (
									<li {...provided.draggableProps} ref={provided.innerRef} key={track.id}>
										<TrackItem
											id={track.id}
											trackUri={track.uri}
											track={track}
											index={index}
											dragHandleProps={provided.dragHandleProps}
											additionalProps={additionalProps}
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
	)
}

export default TrackListDraggable
