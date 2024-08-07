import { useState } from 'react'
import { IImage } from '../../../shared/types/image.type'
import { IAlbum } from '../../../types/album.types'
import { ITrack } from '../../../types/track.types'
import ModalsRoot from '../../Modals/ModalsRoot'
import ThreeDotsOptions from '../../SmallElements/ThreeDotsOptions/ThreeDotsOptions'
import AlbumImage from './AlbumImage'
import AlbumInfo from './AlbumInfo'
import styles from '/src/pages/Entities/AlbumPage/Album.module.scss'

type AlbumTopProps = {
	album_id: string | undefined
	album: IAlbum
	imageCover: IImage[]
	tracks: ITrack[]
}

const AlbumTop = ({ album_id, album, imageCover, tracks }: AlbumTopProps) => {
	const [modalOptions, setModalOptions] = useState(false)

	return (
		<div className={styles.content}>
			<div className={styles.content__row}>
				<AlbumImage imageCover={imageCover} album={album} />

				<AlbumInfo album={album} tracks={tracks} />

				<div className={styles.options}>
					<ThreeDotsOptions setModalOptions={setModalOptions} />

					<ModalsRoot modalOptions={modalOptions} setModalOptions={setModalOptions} album_id={album_id} />
				</div>
			</div>
		</div>
	)
}

export default AlbumTop
