import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useGetPlaylistQuery } from '../../../api/playlist'
import Container from '../../../components/ContainerOverall/Container'
import PlaylistTop from '../../../components/Entities/Playlist/PlaylistTop'
import PlaylistTracks from '../../../components/Entities/Playlist/PlaylistTracks'
import LoaderCircle from '../../../components/Loader/LoaderCircle'
import { usePlaylistTracks } from '../../../hooks/usePlaylists'
import ErrorMessage from '../../../shared/ErrorMessage'
import styles from './Playlist.module.scss'

const Playlist = () => {
	const { playlist_id } = useParams()

	const { tracks, imagesTracks } = usePlaylistTracks(playlist_id)

	const { data, isLoading, isError } = useGetPlaylistQuery(playlist_id, {
		skip: !playlist_id,
	})

	return (
		<Container title={data?.name}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : data ? (
				<motion.div className={styles.wrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
					<PlaylistTop playlist_id={playlist_id!} />

					<PlaylistTracks tracks={tracks} imagesTracks={imagesTracks} />
				</motion.div>
			) : (
				''
			)}
		</Container>
	)
}

export default Playlist
