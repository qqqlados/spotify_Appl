import { useGetCurrentUserPlaylistsQuery } from '../../../api/playlist'
import { useGetFollowedArtistsQuery } from '../../../api/user'
import { useCurrentUserPlaylists } from '../../../hooks/usePlaylists'
import ErrorMessage from '../../../shared/ErrorMessage'
import PlaylistsList from '../../Lists/PlaylistsList/PlaylistsList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'

const MyPlaylists = () => {
	const { data: followedArtists } = useGetFollowedArtistsQuery()

	const { playlists } = useCurrentUserPlaylists()

	const { isLoading, isError } = useGetCurrentUserPlaylistsQuery(undefined, {
		skip: !followedArtists,
	})

	return (
		<>
			{playlists?.length > 0 ? (
				<section className={s.added_playlists}>
					{isLoading ? (
						<LoaderCircle />
					) : isError ? (
						<ErrorMessage />
					) : playlists ? (
						<>
							<h2 className={s.heading}>My Playlists (followed or created)</h2>
							<PlaylistsList playlists={playlists} short={true} />
						</>
					) : (
						''
					)}
				</section>
			) : (
				''
			)}
		</>
	)
}

export default MyPlaylists
