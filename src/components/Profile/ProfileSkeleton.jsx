import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { CiUser } from 'react-icons/ci'
import s from './ProfileSkeleton.module.scss'
import PlaylistActionsModal from '/src/components/Modals/PlaylistModal/PlaylistActions/PlaylistActionsModal'

const Profile = ({ user, isCurrentUser, playlists, shrink }) => {
	const [modalCreatePl, setModalCreatePl] = useState(false)

	return (
		<div className={clsx(s.content, shrink && s.content_shrink)}>
			<section className={s.content__image}>{user?.images?.length > 0 ? <img src={user?.images[1]?.url} alt='' /> : <CiUser />}</section>

			<section className={s.content__info}>
				<span>Profile</span>
				<h1 className={s.name}>{user?.display_name}</h1>
				<div className={s.details}>
					<span className={s.followers}>{user?.followers?.total} followers</span>

					{isCurrentUser && <span className={s.country}> {user?.country}</span>}

					{!isCurrentUser && <p className={s.public_playlists}>{playlists?.length} public playlists </p>}
				</div>
			</section>

			{isCurrentUser && (
				<button className={s.create_playlist} onClick={() => setModalCreatePl(true)} style={{ width: '160px' }}>
					+Create playlist
				</button>
			)}

			<AnimatePresence>
				{modalCreatePl && (
					<PlaylistActionsModal setModalCreatePl={setModalCreatePl} userId={user?.id} action={'create'} title={'Create Your Playlist'} />
				)}
			</AnimatePresence>
		</div>
	)
}

export default Profile
