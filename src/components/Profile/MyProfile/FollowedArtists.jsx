import React from 'react'
import { useGetSavedTracksQuery } from '../../../api/tracks'
import { useGetFollowedArtistsQuery } from '../../../api/user'
import { useFollowedArtists } from '../../../hooks/useMyProfile'
import ArtistsList from '../../Lists/ArtistsList/ArtistsList'
import LoaderFullScreen from '../../Loader/LoaderFullScreen'
import s from '/src/pages/Profile/MyProfile/MyProfile.module.scss'
import ErrorMessage from '/src/shared/ErrorMessage'

const FollowedArtists = () => {
	const { data: savedTracks } = useGetSavedTracksQuery()

	const { followedArtists, imagesFollowedArtists } = useFollowedArtists()

	const { isLoading, isError } = useGetFollowedArtistsQuery(undefined, {
		skip: !savedTracks,
	})

	return (
		<section className={s.followed_artists}>
			{isLoading ? (
				<LoaderFullScreen />
			) : isError ? (
				<ErrorMessage />
			) : followedArtists && imagesFollowedArtists ? (
				<>
					<h2 className={s.heading}>Followed Artists</h2>

					<ArtistsList artists={followedArtists} images={imagesFollowedArtists} />
				</>
			) : (
				''
			)}
		</section>
	)
}

export default FollowedArtists
