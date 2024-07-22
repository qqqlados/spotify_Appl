import React from 'react'
import { useGetCurrentUserPlaylistsQuery } from '../../../api/playlist'
import { useGetCurrentUserQuery, useGetFollowedArtistsQuery } from '../../../api/user'
import { useCurrentUserPlaylists } from '../../../hooks/usePlaylists'
import PlaylistsList from '../../Lists/PlaylistsList/PlaylistsList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'

const MyPlaylists = () => {
	const { data: followedArtists } = useGetFollowedArtistsQuery()

	const { playlists, imagesPlaylists } = useCurrentUserPlaylists()

	const { isLoading, isError } = useGetCurrentUserPlaylistsQuery(undefined, {
		skip: !followedArtists,
	})

	const { data: currentUser } = useGetCurrentUserQuery(undefined, {
		skip: !followedArtists,
	})

	return (
		<section className={s.added_playlists}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : playlists && imagesPlaylists ? (
				<>
					<h2 className={s.heading}>My Playlists (followed or created)</h2>
					<PlaylistsList playlists={playlists} images={imagesPlaylists} currentUser={currentUser} />
				</>
			) : (
				''
			)}
		</section>
	)
}

export default MyPlaylists
