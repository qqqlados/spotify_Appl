import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { IImage } from '../../../shared/types/image.type'
import { IAlbum } from '../../../types/album.types'
import styles from './AlbumsList.module.scss'

type AlbumsListProps = {
	albums: Array<IAlbum>
	images: Array<IImage>
	newReleases?: boolean
}

const AlbumsList = ({ albums, images, newReleases }: AlbumsListProps) => {
	return (
		<div className={clsx(styles.container, newReleases && styles.container_high)}>
			{albums?.map((item, index) => (
				<Link key={item?.id} to={`/album/${item.id}`} className={styles.album}>
					<div className={styles.image}>
						<img src={images[index]?.url} alt='Something' />
					</div>
					<p className={styles.name}>{item?.name}</p>
				</Link>
			))}
		</div>
	)
}

export default AlbumsList
