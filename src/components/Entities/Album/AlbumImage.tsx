import { IImage } from '../../../shared/types/image.type'
import { IAlbum } from '../../../types/album.types'
import styles from '/src/pages/Entities/AlbumPage/Album.module.scss'

type AlbumImageProps = {
	imageCover: IImage[]
	album: IAlbum
}

const AlbumImage = ({ imageCover, album }: AlbumImageProps) => {
	return (
		<div className={styles.image}>
			{imageCover?.map(img => (
				<img key={album?.id} src={img.url} alt='Album image' />
			))}
		</div>
	)
}

export default AlbumImage
