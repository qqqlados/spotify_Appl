import { IImage } from '../../../shared/types/image.type'
import { ITrack } from '../../../types/track.types'
import TrackList from '../../Lists/TrackList/TrackList'
import styles from '/src/pages/Entities/PlaylistPage/Playlist.module.scss'

type PlaylistTracksProps = {
	tracks: ITrack[]
	imagesTracks: IImage[]
}

const PlaylistTracks = ({ tracks, imagesTracks }: PlaylistTracksProps) => {
	return <div className={styles.tracks}>{<TrackList tracks={tracks} images={imagesTracks} />}</div>
}

export default PlaylistTracks
