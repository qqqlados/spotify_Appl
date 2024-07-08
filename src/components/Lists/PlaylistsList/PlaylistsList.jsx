import React from 'react'
import { PiPlaylistLight } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import styles from './PlaylistsList.module.scss'

const PlaylistsList = ({ playlists, images }) => {
	return (
		<div className={styles.container}>
			{playlists?.map((item, index) => (
				<div key={item?.id} className={styles.container_item}>
					<Link to={`/playlist/${item?.id}`} className={styles.item}>
						<div className={styles.image}>
							{images[index] ? (
								<img src={images[index]?.url} alt='Playlist cover' width={320} height={320} />
							) : images[index] == null ? (
								<div className={styles.image_default}>
									<PiPlaylistLight />
								</div>
							) : (
								''
							)}
						</div>
						<p className={styles.title}>{playlists[index]?.name}</p>
					</Link>
				</div>
			))}
		</div>
	)
}

export default PlaylistsList
