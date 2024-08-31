import { PiPlaylistLight } from 'react-icons/pi'
import { IImage } from '../../../../shared/types/image.type'
import styles from '/src/pages/Entities/PlaylistPage/Playlist.module.scss'

const PlaylistImage = ({ imageCover }: { imageCover: IImage }) => {
	return <div className={styles.image}>{imageCover !== null ? <img src={imageCover?.url} /> : <PiPlaylistLight />}</div>
}

export default PlaylistImage
