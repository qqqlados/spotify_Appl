import { useGetSavedTracksQuery } from '../../../api/tracks'
import { useGetFollowedArtistsQuery } from '../../../api/user'
import { useFollowedArtists } from '../../../hooks/useMyProfile'
import ErrorMessage from '../../../shared/ErrorMessage'
import ArtistsList from '../../Lists/ArtistsList/ArtistsList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'

const FollowedArtists = () => {
	const { data: savedTracks } = useGetSavedTracksQuery()

	const { followedArtists } = useFollowedArtists()

	const { isLoading, isError } = useGetFollowedArtistsQuery(undefined, {
		skip: !savedTracks,
	})

	return (
		<section className={s.followed_artists}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : followedArtists ? (
				<>
					<h2 className={s.heading}>Followed Artists</h2>

					<ArtistsList artists={followedArtists} />
				</>
			) : (
				''
			)}
		</section>
	)
}

export default FollowedArtists
