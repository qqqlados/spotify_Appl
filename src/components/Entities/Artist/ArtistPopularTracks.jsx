import React from 'react'
import { useArtistAlbums, useArtistTopTracks } from '../../../hooks/useArtist'
import { useTrackRecommendations } from '../../../hooks/useTrack'
import TrackList from '/src/components/Lists/TrackList/TrackList'
import s from '/src/pages/Entities/ArtistPage/Artist.module.scss'

const ArtistPopularTracks = ({ artist_id }) => {
	const { tracks, tracksImages, isLoadingTopTracks } = useArtistTopTracks(artist_id)

	const { isErrorArtistAlbums } = useArtistAlbums(artist_id)

	const { areTracksRecommendations } = useTrackRecommendations()

	return (
		<div className={s.popular_tracks}>
			{isLoadingTopTracks ? (
				<div>Loading...</div>
			) : isErrorArtistAlbums ? (
				<p>Ooops, there is some connection error..</p>
			) : (
				<>
					<h2 className={s.title}>Popular Tracks</h2>
					<TrackList tracks={tracks} images={tracksImages} areTracksRecommendations={areTracksRecommendations(tracks)} />
				</>
			)}
		</div>
	)
}

export default ArtistPopularTracks
