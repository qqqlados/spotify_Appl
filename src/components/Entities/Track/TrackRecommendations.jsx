import clsx from 'clsx'
import React from 'react'
import { useGetRecommendationsQuery } from '../../../api/tracks'
import { useTrackRecommendations } from '../../../hooks/useTrack'
import TrackList from '/src/components/Lists/TrackList/TrackList'
import LoaderCircle from '/src/components/Loader/LoaderCircle'
import s from '/src/pages/Entities/TrackPage/Track.module.scss'
import ErrorMessage from '/src/shared/ErrorMessage'

const TrackRecommendations = ({ track_id, artist_id }) => {
	const { reco, areTracksRecommendations } = useTrackRecommendations(artist_id, track_id)

	const { isLoading, isError } = useGetRecommendationsQuery({ artist_id, track_id })

	const tracks = reco?.tracks

	const imagesTracks = reco?.tracks?.map(item => item.album.images.filter(img => img.height == 64)).map(item => item[0])

	return (
		<section className={clsx(s.recommendations, isLoading && s.recommendations__passive)}>
			<h2 className={s.recommendations_title}>
				<span>Recommendations</span>
				<br />
				<span>Based by this track</span>
			</h2>

			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : (
				<TrackList tracks={tracks} images={imagesTracks} areTracksRecommendations={areTracksRecommendations(tracks)} />
			)}
		</section>
	)
}

export default TrackRecommendations
