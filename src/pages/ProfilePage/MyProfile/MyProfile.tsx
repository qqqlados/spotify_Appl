import { motion } from 'framer-motion'
import { useGetCurrentUserQuery } from '../../../api/user'
import Container from '../../../components/ContainerOverall/Container'
import LoaderCircle from '../../../components/Loader/LoaderCircle'
import UserSearch from '../../../components/Profile/MyProfile/UserSearch'
import { FollowedArtists, MyPlaylists, SavedAlbums, SavedTracks, TopItems } from '../../../components/Profile/MyProfileComponents'
import ProfileSkeleton from '../../../components/Profile/ProfileSkeleton'
import { useResizeHeader } from '../../../hooks/useResize'
import ErrorMessage from '../../../shared/ErrorMessage'
import s from './MyProfile.module.scss'

const MyProfile = () => {
	const { data: user, isLoading, isError } = useGetCurrentUserQuery()

	const { scrolled, handleScroll } = useResizeHeader()

	return (
		<Container title={'My Profile'}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : user ? (
				<motion.div className={s.wrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
					<div className={s.inner_container} onScroll={e => handleScroll(e)}>
						<ProfileSkeleton user={user} isCurrentUser={true} shrink={scrolled} />

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
		</Container>
	)
}

export default MyProfile
