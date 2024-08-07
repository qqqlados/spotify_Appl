import { AnimatePresence } from 'framer-motion'
import React from 'react'
import TrackListModal from '../../../Modals/TrackListModal/TrackListModal'
import styles from '/src/pages/Entities/PlaylistPage/Playlist.module.scss'

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
			<AnimatePresence>{modalTrackList && <TrackListModal setModalIsOpen={setModalTrackList} />}</AnimatePresence>
		</>
	)
}

export default PlaylistAddTrackButton
