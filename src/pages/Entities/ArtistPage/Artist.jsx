import { motion } from 'framer-motion'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetArtistQuery } from '../../../api/artists'
import LoaderCircle from '../../../components/Loader/LoaderCircle'
import s from './Artist.module.scss'
import { ArtistAlbums, ArtistPopularTracks, ArtistRelatedArtists, ArtistTop } from '/src/components/Entities/Artist/artistComponents'
import ErrorMessage from '/src/shared/ErrorMessage'

const Artist = () => {
	const { artist_id } = useParams()

	const { data, isLoading, isError } = useGetArtistQuery(artist_id, {
		skip: !artist_id,
	})

	return (
		<>
			<motion.div className={s.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
				{isLoading ? (
					<LoaderCircle />
				) : isError ? (
					<ErrorMessage />
				) : data ? (
					<>
						<ArtistTop artist_id={artist_id} />

						<div className={s.content}>
							<ArtistPopularTracks artist_id={artist_id} />

							<ArtistAlbums artist_id={artist_id} />

							<ArtistRelatedArtists artist_id={artist_id} />
						</div>
					</>
				) : (
					''
				)}
			</motion.div>
		</>
	)
}

export default Artist
