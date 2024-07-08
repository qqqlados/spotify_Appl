import { motion } from 'framer-motion'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetArtistQuery } from '../../../api/artists'
import ArtistAlbums from '../../../components/Entities/Artist/ArtistAlbums'
import ArtistPopularTracks from '../../../components/Entities/Artist/ArtistPopularTracks'
import ArtistRelatedArtists from '../../../components/Entities/Artist/ArtistRelatedArtists'
import ArtistTop from '../../../components/Entities/Artist/ArtistTop'
import LoaderFullScreen from '../../../components/Loader/LoaderFullScreen'
import s from './Artist.module.scss'
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
					<LoaderFullScreen />
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
