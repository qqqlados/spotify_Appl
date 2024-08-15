import { motion } from 'framer-motion'
import { useGetNewReleasesQuery } from '../../api/albums'
import Container from '../../components/ContainerOverall/Container'
import AlbumsList from '../../components/Lists/AlbumsList/AlbumsList'
import LoaderCircle from '../../components/Loader/LoaderCircle'
import { useNewReleases } from '../../hooks/useAlbums'
import ErrorMessage from '../../shared/ErrorMessage'
import styles from './Home.module.scss'

const Home = () => {
	const { albums, images } = useNewReleases()
	const { isLoading, isError } = useGetNewReleasesQuery()

	return (
		<Container title={'Home'}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : albums ? (
				<motion.div className={styles.wrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
					<h1 className={styles.title}>New Releases</h1>
					<div className={styles.new_releases}>
						{isLoading ? <LoaderCircle /> : isError ? <ErrorMessage /> : <AlbumsList albums={albums} images={images} newReleases={true} />}
					</div>
					<div className={styles.tracks_for_you}></div>
				</motion.div>
			) : (
				''
			)}
		</Container>
	)
}

export default Home
