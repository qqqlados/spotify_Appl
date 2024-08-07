import { motion } from 'framer-motion'
import { PiMaskSadLight } from 'react-icons/pi'
import { useGetUserPlaylistsQuery } from '../../../api/user'
import PlaylistsList from '../../../components/Lists/PlaylistsList/PlaylistsList'
import LoaderCircle from '../../../components/Loader/LoaderCircle'
import ProfileSkeleton from '../../../components/Profile/ProfileSkeleton'
import { useAppSelector } from '../../../hooks/redux'
import { useSearchUser } from '../../../hooks/useMyProfile'
import ErrorMessage from '../../../shared/ErrorMessage'
import s from './UserProfile.module.scss'

const UserProfile = () => {
	const userSearchTerm = useAppSelector(state => state.search.userSearchTerm)

	const { user, isUserLoading, isUserError } = useSearchUser(userSearchTerm)

	const userId = user?.id

	const { playlists, imagesPlaylists } = useGetUserPlaylistsQuery(userId!, {
		skip: !userId,
		selectFromResult: ({ data }) => ({
			playlists: data?.items || [],
			imagesPlaylists: [...(data?.items?.map(item => item?.images) || [])].flat(),
		}),
	})

	return (
		<>
			{isUserLoading ? (
				<LoaderCircle />
			) : isUserError ? (
				<div className={s.error}>
					<ErrorMessage message={'We are sorry but the user you searched does not exist.'} />
					<PiMaskSadLight />
				</div>
			) : user ? (
				<motion.div className={s.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
					<div className={s.content__container}>
						<ProfileSkeleton user={user} isCurrentUser={false} playlists={playlists} />

						<div className={s.content}>
							<PlaylistsList playlists={playlists} images={imagesPlaylists} />
						</div>
					</div>
				</motion.div>
			) : (
				''
			)}
		</>
	)
}

export default UserProfile
