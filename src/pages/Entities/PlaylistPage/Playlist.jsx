import { motion } from 'framer-motion'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPlaylistQuery } from '../../../api/playlist'
import PlaylistTop from '../../../components/Entities/Playlist/PlaylistTop'
import PlaylistTracks from '../../../components/Entities/Playlist/PlaylistTracks'
import LoaderFullScreen from '../../../components/Loader/LoaderFullScreen'
import { usePlaylistTracks } from '../../../hooks/usePlaylists'
import styles from './Playlist.module.scss'

const Playlist = () => {
	const { playlist_id } = useParams()

	const { tracks, imagesTracks } = usePlaylistTracks(playlist_id)

	const { data, isLoading, isError } = useGetPlaylistQuery(playlist_id, {
		skip: !playlist_id,
	})

	return (
		<>
			{isLoading ? (
				<LoaderFullScreen />
			) : isError ? (
				<p>Sorry, there's a server error.</p>
			) : data ? (
				<motion.div
					className={styles.container}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					<PlaylistTop playlist_id={playlist_id} />

					<PlaylistTracks playlist_id={playlist_id} tracks={tracks} imagesTracks={imagesTracks} />
				</motion.div>
			) : (
				''
			)}
		</>
	)
}

export default Playlist
