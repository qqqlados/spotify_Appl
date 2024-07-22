import React from 'react'
import { useGetSavedTracksQuery } from '../../../api/tracks'
import { useGetFollowedArtistsQuery } from '../../../api/user'
import { useFollowedArtists } from '../../../hooks/useMyProfile'
import ArtistsList from '../../Lists/ArtistsList/ArtistsList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'
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
				<LoaderCircle />
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
