import { useGetSavedAlbumsQuery } from '../../../api/albums'
import { useGetCurrentUserQuery } from '../../../api/user'
import { useSavedAlbums } from '../../../hooks/useAlbums'
import ErrorMessage from '../../../shared/ErrorMessage'
import AlbumsList from '../../Lists/AlbumsList/AlbumsList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'

const SavedAlbums = () => {
	const { data: user } = useGetCurrentUserQuery()

	const { savedAlbums } = useSavedAlbums()

	const { isLoading, isError } = useGetSavedAlbumsQuery(undefined, {
		skip: !user,
	})

	return (
		<section className={s.saved_albums}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : savedAlbums ? (
				<>
					<h2 className={s.heading}>Saved Albums</h2>
					<AlbumsList albums={savedAlbums} />
				</>
			) : (
				''
			)}
		</section>
	)
}

export default SavedAlbums
