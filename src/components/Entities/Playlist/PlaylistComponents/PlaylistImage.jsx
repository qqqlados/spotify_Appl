import React from 'react'
import { PiPlaylistLight } from 'react-icons/pi'
import styles from '/src/pages/Entities/PlaylistPage/Playlist.module.scss'

const PlaylistImage = ({ imageCover }) => {
	return <div className={styles.image}>{imageCover ? <img src={imageCover?.url} height={300} width={300} /> : <PiPlaylistLight />}</div>
}

export default PlaylistImage
