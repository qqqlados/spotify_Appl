import { ITrack } from '../../../types/track.types'
import TrackList from '../../Lists/TrackList/TrackList'
import styles from '/src/pages/Entities/AlbumPage/Album.module.scss'

const AlbumTracks = ({ tracks }: { tracks: ITrack[] }) => {
	return <div className={styles.tracks}>{tracks && <TrackList tracks={tracks} />}</div>
}

export default AlbumTracks
