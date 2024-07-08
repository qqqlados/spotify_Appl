import React, { useState } from 'react'
import ModalsRoot from '../../Modals/ModalsRoot'
import ThreeDotsOptions from '../../SmallElements/ThreeDotsOptions/ThreeDotsOptions'
import AlbumImage from './AlbumImage'
import AlbumInfo from './AlbumInfo'
import styles from '/src/pages/Entities/AlbumPage/Album.module.scss'

const AlbumTop = ({ album_id, album, imageCover, tracks }) => {
	const [modalOptions, setModalOptions] = useState(false)

	return (
		<div className={styles.content}>
			<div className={styles.content__row}>
				<AlbumImage imageCover={imageCover} album={album} />

				<AlbumInfo album_id={album_id} album={album} tracks={tracks} />

				<div className={styles.options}>
					<ThreeDotsOptions modalOptions={modalOptions} setModalOptions={setModalOptions} album_id={album_id} />

					<ModalsRoot modalOptions={modalOptions} setModalOptions={setModalOptions} album_id={album_id} />
				</div>
			</div>
		</div>
	)
}

export default AlbumTop
