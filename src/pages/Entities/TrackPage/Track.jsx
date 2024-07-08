import { motion } from 'framer-motion'
import React from 'react'
import { useParams } from 'react-router-dom'
import TrackRecommendations from '../../../components/Entities/Track/TrackRecommendations'
import TrackTop from '../../../components/Entities/Track/TrackTop'
import s from './Track.module.scss'
import { useGetTrackQuery } from '/src/api/tracks'
import LoaderFullScreen from '/src/components/Loader/LoaderFullScreen'
import { useTrack } from '/src/hooks/useTrack'
import ErrorMessage from '/src/shared/ErrorMessage'

const Track = () => {
	const { track_id } = useParams()

	const { artist_id } = useTrack(track_id)

	const { isLoading: isLoadingTracks, error: errorTracks } = useGetTrackQuery(track_id)

	return (
		<motion.div className={s.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
			{isLoadingTracks ? (
				<div className={s.loading}>
					<LoaderFullScreen />
				</div>
			) : errorTracks ? (
				<ErrorMessage />
			) : (
				<div className={s.content}>
					<TrackTop track_id={track_id} artist_id={artist_id} />

					<TrackRecommendations track_id={track_id} artist_id={artist_id} />
				</div>
			)}
		</motion.div>
	)
}

export default Track
