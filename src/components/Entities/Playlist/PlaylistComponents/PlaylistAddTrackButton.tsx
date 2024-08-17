import { AnimatePresence } from 'framer-motion'
import React, { lazy, Suspense } from 'react'
import styles from '/src/pages/Entities/PlaylistPage/Playlist.module.scss'

const TrackListModal = lazy(() => import('../../../Modals/TrackListModal/TrackListModal'))

type AddTracksButtonProps = {
	modalTrackList: boolean
	setModalTrackList: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaylistAddTrackButton = ({ modalTrackList, setModalTrackList }: AddTracksButtonProps) => {
	return (
		<>
			<button className={styles.add_track_btn} onClick={() => setModalTrackList(true)}>
				Add more tracks
			</button>
			<AnimatePresence>
				{modalTrackList && (
					<Suspense>
						<TrackListModal setModalIsOpen={setModalTrackList} />
					</Suspense>
				)}
			</AnimatePresence>
		</>
	)
}

export default PlaylistAddTrackButton
