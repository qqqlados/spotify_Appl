import React from 'react'
import { useArtistTopTracks } from '../../../hooks/useArtist'
import TrackList from '/src/components/Lists/TrackList/TrackList'
import LoaderCircle from '/src/components/Loader/LoaderCircle'
import s from '/src/pages/Entities/ArtistPage/Artist.module.scss'
import ErrorMessage from '/src/shared/ErrorMessage'

const ArtistPopularTracks = ({ artist_id }) => {
	const { tracks, tracksImages, isLoadingTopTracks, isErrorArtistTopTracks } = useArtistTopTracks(artist_id)

	return (
		<div className={s.popular_tracks}>
			{isLoadingTopTracks ? (
				<LoaderCircle />
			) : isErrorArtistTopTracks ? (
				<ErrorMessage />
			) : (
				<>
					<h2 className={s.title}>Popular Tracks</h2>
					<TrackList tracks={tracks} images={tracksImages} areTracksRecommendations={true} />
				</>
			)}
		</div>
	)
}

export default ArtistPopularTracks
