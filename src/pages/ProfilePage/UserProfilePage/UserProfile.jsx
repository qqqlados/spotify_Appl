import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { PiMaskSadLight } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { useGetUserPlaylistsQuery } from '../../../api/user'
import PlaylistsList from '../../../components/Lists/PlaylistsList/PlaylistsList'
import ProfileSkeleton from '../../../components/Profile/ProfileSkeleton'
import { useSearchUser } from '../../../hooks/useMyProfile'
import s from './UserProfile.module.scss'
import LoaderCircle from '/src/components/Loader/LoaderCircle'
import ErrorMessage from '/src/shared/ErrorMessage'

const UserProfile = () => {
	const userSearchTerm = useSelector(state => state.search.userSearchTerm)
	const [startSearch, setStartSearch] = useState(false)
	const { user, isUserLoading, isUserError } = useSearchUser(userSearchTerm)

	const userId = user?.id

	const { data } = useGetUserPlaylistsQuery(userId, {
		skip: !userId,
	})

	const imagesPlaylists = data?.items?.map(item => (item?.images ? item?.images[0] : null))

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
						<ProfileSkeleton user={user} isCurrentUser={false} playlists={data?.items} />

						<div className={s.content}>
							<PlaylistsList playlists={data?.items} images={imagesPlaylists} />
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
