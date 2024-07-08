import TrackList from '/src/components/Lists/TrackList/TrackList'
import styles from '/src/pages/Entities/PlaylistPage/Playlist.module.scss'

const PlaylistTracks = ({ tracks, imagesTracks }) => {
	return <div className={styles.tracks}>{<TrackList tracks={tracks} images={imagesTracks} />}</div>
}

export default PlaylistTracks
