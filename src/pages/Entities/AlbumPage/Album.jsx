import { motion } from 'framer-motion'
import React from 'react'
import { useParams } from 'react-router-dom'
import AlbumTop from '../../../components/Entities/Album/AlbumTop'
import AlbumTracks from '../../../components/Entities/Album/AlbumTracks.'
import LoaderCircle from '../../../components/Loader/LoaderCircle'
import { useGetAlbumQuery } from '/src/api/albums'
import styles from '/src/pages/Entities/AlbumPage/Album.module.scss'
import ErrorMessage from '/src/shared/ErrorMessage'

const Album = () => {
	const { album_id } = useParams()

	const { data, album, tracks, imageCover, isLoading, isError } = useGetAlbumQuery(album_id, {
		selectFromResult: ({ data }) => ({
			data: data,
			album: data,
			tracks: data?.tracks?.items || [],
			imageCover: data?.images.filter(item => item.height === 640),
		}),
	})

	return (
		<>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : album ? (
				<motion.div
					className={styles.container}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					<AlbumTop album_id={album_id} album={album} imageCover={imageCover} tracks={tracks} />

					<AlbumTracks tracks={tracks} imageCover={imageCover} />

					{/* <AlbumImage imageCover={imageCover} album={album} />

					<AlbumInfo album_id={album_id} album={album} tracks={tracks} imageCover={imageCover} /> */}
				</motion.div>
			) : (
				''
			)}
		</>
	)
}

export default Album
