import { IImage } from '../../../shared/types/image.type'
import { ITrack } from '../../../types/track.types'
import TrackList from '../../Lists/TrackList/TrackList'
import styles from '/src/pages/Entities/AlbumPage/Album.module.scss'

type AlbumTracksProps = {
	tracks: ITrack[]
	imageCover: IImage[]
}

const AlbumTracks = ({ tracks, imageCover }: AlbumTracksProps) => {
	return <div className={styles.tracks}>{tracks && <TrackList tracks={tracks} images={imageCover} />}</div>
}

export default AlbumTracks
