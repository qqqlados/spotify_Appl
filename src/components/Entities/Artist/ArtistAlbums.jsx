import React from 'react'
import { useArtistAlbums } from '../../../hooks/useArtist'
import AlbumsList from '/src/components/Lists/AlbumsList/AlbumsList'
import s from '/src/pages/Entities/ArtistPage/Artist.module.scss'

const ArtistAlbums = ({ artist_id }) => {
	const { albums, albumsImages, isLoadingArtistAlbums, isErrorArtistAlbums } = useArtistAlbums(artist_id)

	return (
		<div className={s.albums}>
			{isLoadingArtistAlbums ? (
				<div>Loading...</div>
			) : isErrorArtistAlbums ? (
				<p>Ooops, there is some connection error..</p>
			) : (
				<>
					<h2 className={s.title}>Albums</h2>
					<AlbumsList albums={albums} images={albumsImages} />{' '}
				</>
			)}
		</div>
	)
}

export default ArtistAlbums
