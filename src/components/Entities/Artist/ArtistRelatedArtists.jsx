import React from 'react'
import { useRelatedArtists } from '../../../hooks/useArtist'
import ArtistsList from '/src/components/Lists/ArtistsList/ArtistsList'
import s from '/src/pages/Entities/ArtistPage/Artist.module.scss'

const ArtistRelatedArtists = ({ artist_id }) => {
	const { relatedArtists, artistsImages, isLoadingRelatedArtists, isErrorRelatedArtists } = useRelatedArtists(artist_id)

	return (
		<div className={s.related_artists}>
			<h2 className={s.title}>Also liked</h2>
			<div className={s.content}>
				{isLoadingRelatedArtists ? (
					<div>Loading...</div>
				) : isErrorRelatedArtists ? (
					<p>Ooops, there is some connection error..</p>
				) : (
					<ArtistsList artists={relatedArtists} images={artistsImages} />
				)}
			</div>

			<p>Artist</p>
		</div>
	)
}

export default ArtistRelatedArtists
