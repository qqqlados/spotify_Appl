import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useGetAlbumQuery } from '../../../api/albums'
import Container from '../../../components/ContainerOverall/Container'
import AlbumTop from '../../../components/Entities/Album/AlbumTop'
import AlbumTracks from '../../../components/Entities/Album/AlbumTracks.'
import LoaderCircle from '../../../components/Loader/LoaderCircle'
import ErrorMessage from '../../../shared/ErrorMessage'
import styles from '/src/pages/Entities/AlbumPage/Album.module.scss'

const Album = () => {
	const { album_id } = useParams()

	const { album, tracks, imageCover } = useGetAlbumQuery(album_id!, {
		selectFromResult: ({ data }) => ({
			album: data,
			tracks: data?.tracks?.items || [],
			imageCover: data?.images.filter(item => item.height === 640) || [],
		}),
	})

	const { isLoading, isError } = useGetAlbumQuery(album_id!)

	return (
		<Container title={album?.name}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : album ? (
				<motion.div className={styles.wrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
					<AlbumTop album_id={album_id} album={album} imageCover={imageCover} tracks={tracks} />

					<AlbumTracks tracks={tracks} imageCover={imageCover} />
				</motion.div>
			) : (
				''
			)}
		</Container>
	)
}

export default Album
