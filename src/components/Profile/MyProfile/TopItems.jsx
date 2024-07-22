import React from 'react'
import { useGetCurrentUserPlaylistsQuery } from '../../../api/playlist'
import { useGetCurrentUserQuery, useGetTopItemsQuery } from '../../../api/user'
import { useTopItems } from '../../../hooks/useMyProfile'
import ArtistsList from '../../Lists/ArtistsList/ArtistsList'
import TrackList from '../../Lists/TrackList/TrackList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'
import ErrorMessage from '/src/shared/ErrorMessage'

const TopItems = () => {
	const { data: currentUser } = useGetCurrentUserQuery()

	const { data } = useGetCurrentUserPlaylistsQuery()

	const { artistsArr, imagesArtistsArr } = useTopItems('artists', currentUser)

	const { tracksArr, imagesTracksArr } = useTopItems('tracks', currentUser)

	const {
		data: artists,
		isLoading: isArtistsLoading,
		isError: isArtistsError,
	} = useGetTopItemsQuery('artists', {
		skip: !data,
	})

	const {
		data: tracks,
		isLoading: isTracksLoading,
		isError: isTracksError,
	} = useGetTopItemsQuery('tracks', {
		skip: !data,
	})

	return (
		<section className={s.top_items}>
			{isArtistsLoading ? (
				<LoaderCircle />
			) : isArtistsError ? (
				<ErrorMessage />
			) : artists ? (
				<div className={s.top_artists}>
					<h2 className={s.heading}>User's Top Artists</h2>
					<ArtistsList artists={artistsArr} images={imagesArtistsArr} />
				</div>
			) : (
				''
			)}
			{isTracksLoading ? (
				<LoaderCircle />
			) : isTracksError ? (
				<ErrorMessage />
			) : tracks ? (
				<div className={s.top_tracks}>
					<h2 className={s.heading}>User's Top Tracks</h2>
					<TrackList tracks={tracksArr} images={imagesTracksArr} short={true} />
				</div>
			) : (
				''
			)}
		</section>
	)
}

export default TopItems
