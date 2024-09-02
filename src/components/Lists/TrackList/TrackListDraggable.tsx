import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { IImage } from '../../../shared/types/image.type'
import { ITrack } from '../../../types/track.types'
import TrackItem from './TrackItem'
import styles from './TrackList.module.scss'

type TrackListDraggableProps = {
	tracks: ITrack[] | []
	handleOnDragEnd: (result: DropResult) => void
	reorder: boolean
	additionalProps?: null
}

const TrackListDraggable = ({ tracks, handleOnDragEnd }: TrackListDraggableProps) => {
	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId='tracks'>
				{provided => (
					<ul className={`${styles.list} ${styles.reorder}`} {...provided.droppableProps} ref={provided.innerRef}>
						{tracks?.map((track, index) => (
							<Draggable key={track.id} draggableId={track.id} index={index}>
								{provided => (
									<li {...provided.draggableProps} ref={provided.innerRef} key={track.id}>
										<TrackItem
											id={track.id}
											trackUri={track.uri}
											track={track}
											index={index}
											reorder={true}
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
	)
}

export default TrackListDraggable
