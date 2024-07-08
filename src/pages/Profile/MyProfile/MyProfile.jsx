import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useGetCurrentUserQuery } from '../../../api/user'
import LoaderFullScreen from '../../../components/Loader/LoaderFullScreen'
import UserSearch from '../../../components/Profile/MyProfile/UserSearch'
import { FollowedArtists, MyPlaylists, SavedAlbums, SavedTracks, TopItems } from '../../../components/Profile/MyProfileComponents'
import Profile from '../../../components/Profile/Profile'
import { useResizeHeader } from '../../../hooks/useResize'
import s from './MyProfile.module.scss'
import ErrorMessage from '/src/shared/ErrorMessage'

const MyProfile = () => {
	const { data: user, isLoading, isError } = useGetCurrentUserQuery()

	const container = useRef(null)

	const { scrolled, handleScroll } = useResizeHeader(container)

	return (
		<>
			{isLoading ? (
				<LoaderFullScreen />
			) : isError ? (
				<ErrorMessage />
			) : user ? (
				<motion.div className={s.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
					<div className={s.inner_container} onScroll={handleScroll}>
						<Profile user={user} isCurrentUser={true} shrink={scrolled} />

						<div className={s.content}>
							<SavedAlbums />

							<SavedTracks />

							<FollowedArtists />

							<MyPlaylists />

							<TopItems />

							<UserSearch />
						</div>
					</div>
				</motion.div>
			) : (
				''
			)}
		</>
	)
}

export default MyProfile
