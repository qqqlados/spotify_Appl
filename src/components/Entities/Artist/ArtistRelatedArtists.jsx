import React from 'react'
import { useRelatedArtists } from '../../../hooks/useArtist'
import ArtistsList from '/src/components/Lists/ArtistsList/ArtistsList'
import LoaderCircle from '/src/components/Loader/LoaderCircle'
import s from '/src/pages/Entities/ArtistPage/Artist.module.scss'
import ErrorMessage from '/src/shared/ErrorMessage'

const ArtistRelatedArtists = ({ artist_id }) => {
	const { relatedArtists, artistsImages, isLoadingRelatedArtists, isErrorRelatedArtists } = useRelatedArtists(artist_id)

	return (
		<div className={s.related_artists}>
			<h2 className={s.title}>Also liked</h2>
			<div className={s.content}>
				{isLoadingRelatedArtists ? (
					<LoaderCircle />
				) : isErrorRelatedArtists ? (
					<ErrorMessage />
				) : (
					<ArtistsList artists={relatedArtists} images={artistsImages} />
				)}
			</div>
		</div>
	)
}

export default ArtistRelatedArtists
