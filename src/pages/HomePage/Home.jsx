import { motion } from 'framer-motion'
import React from 'react'
import { useGetNewReleasesQuery } from '../../api/albums'
import AlbumsList from '../../components/Lists/AlbumsList/AlbumsList'
import LoaderFullScreen from '../../components/Loader/LoaderFullScreen'
import { useNewReleases } from '../../hooks/useAlbums'
import styles from './Home.module.scss'
import ErrorMessage from '/src/shared/ErrorMessage'

const Home = () => {
	const { albums, images } = useNewReleases()
	const { isLoading, isError } = useGetNewReleasesQuery()

	return (
		<>
			{isLoading ? (
				<LoaderFullScreen />
			) : isError ? (
				<ErrorMessage />
			) : albums ? (
				<motion.div
					className={styles.container}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					<h1 className={styles.title}>New Releases</h1>
					<div className={styles.new_releases}>
						{isLoading ? <LoaderFullScreen /> : isError ? <ErrorMessage /> : <AlbumsList albums={albums} images={images} newReleases={true} />}
					</div>
					<div className={styles.tracks_for_you}></div>
				</motion.div>
			) : (
				''
			)}
		</>
	)
}

export default Home
