import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './AlbumsList.module.scss'

const AlbumsList = ({ albums, images, newReleases }) => {
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
