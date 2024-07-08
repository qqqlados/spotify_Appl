import TrackList from '/src/components/Lists/TrackList/TrackList'
import styles from '/src/pages/Entities/AlbumPage/Album.module.scss'

const AlbumTracks = ({ tracks, imageCover }) => {
	return <div className={styles.tracks}>{tracks && <TrackList tracks={tracks} images={imageCover} />}</div>
}

export default AlbumTracks
