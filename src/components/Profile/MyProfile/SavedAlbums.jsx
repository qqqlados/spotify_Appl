import clsx from 'clsx'
import React from 'react'
import { useGetSavedAlbumsQuery } from '../../../api/albums'
import { useGetCurrentUserQuery } from '../../../api/user'
import { useSavedAlbums } from '../../../hooks/useAlbums'
import AlbumsList from '../../Lists/AlbumsList/AlbumsList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'

const SavedAlbums = ({ scrolled }) => {
	const { data: user } = useGetCurrentUserQuery()

	const { savedAlbums, imagesSavedAlbums } = useSavedAlbums()

	const { isLoading, isError } = useGetSavedAlbumsQuery(undefined, {
		skip: !user,
	})

	return (
		<>
			<section className={clsx(s.saved_albums, scrolled && s.paddingTop)}>
				{isLoading ? (
					<LoaderCircle />
				) : isError ? (
					<p>Ooops, there is a server error or access token is overlasted.</p>
				) : savedAlbums ? (
					<>
						<h2 className={s.heading}>Saved Albums</h2>
						<AlbumsList albums={savedAlbums} images={imagesSavedAlbums} />
					</>
				) : (
					''
				)}
			</section>
		</>
	)
}

export default SavedAlbums
