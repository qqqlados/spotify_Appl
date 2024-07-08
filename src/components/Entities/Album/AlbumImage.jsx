import React from 'react'
import styles from '/src/pages/Entities/AlbumPage/Album.module.scss'

const AlbumImage = ({ imageCover, album }) => {
	return (
		<div className={styles.image}>
			{imageCover?.map(img => (
				<img key={album?.id} src={img.url} alt='Album image' />
			))}
		</div>
	)
}

export default AlbumImage
