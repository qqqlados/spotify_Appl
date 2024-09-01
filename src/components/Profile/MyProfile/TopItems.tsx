import { useGetCurrentUserPlaylistsQuery } from '../../../api/playlist'
import { useGetCurrentUserQuery, useGetTopItemsQuery } from '../../../api/user'
import { useTopItems } from '../../../hooks/useMyProfile'
import ErrorMessage from '../../../shared/ErrorMessage'
import ArtistsList from '../../Lists/ArtistsList/ArtistsList'
import TrackList from '../../Lists/TrackList/TrackList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'

const TopItems = () => {
	const { data: currentUser } = useGetCurrentUserQuery()

	const { data } = useGetCurrentUserPlaylistsQuery()

	const { artistsArr } = useTopItems('artists', currentUser)

	const { tracksArr, imagesTracksArr } = useTopItems('tracks', currentUser)

	const { isLoading: isArtistsLoading, isError: isArtistsError } = useGetTopItemsQuery('artists', {
		skip: !data,
	})

	const { isLoading: isTracksLoading, isError: isTracksError } = useGetTopItemsQuery('tracks', {
		skip: !data,
	})

	return (
		<section className={s.top_items}>
			{isArtistsLoading ? (
				<LoaderCircle />
			) : isArtistsError ? (
				<ErrorMessage />
			) : artistsArr?.length > 0 ? (
				<div className={s.top_artists}>
					<h2 className={s.heading}>User's Top Artists</h2>
					<ArtistsList artists={artistsArr} />
				</div>
			) : (
				''
			)}
			{isTracksLoading ? (
				<LoaderCircle />
			) : isTracksError ? (
				<ErrorMessage />
			) : tracksArr?.length > 0 ? (
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
