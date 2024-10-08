import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheckIfUserFollowsQuery } from '../../../../api/playlist'
import { useGetCurrentUserQuery } from '../../../../api/user'
import { usePlaylistMutations } from '../../../../hooks/usePlaylists'
import LoaderCircle from '../../../Loader/LoaderCircle'
import styles from '/src/pages/Entities/PlaylistPage/Playlist.module.scss'

type PlaylistActionButtonProps = {
	owner_name: string | undefined
	playlist_id: string | undefined
}

const PlaylistActionButton = ({ owner_name, playlist_id }: PlaylistActionButtonProps) => {
	const navigate = useNavigate()
	const [disabled, setDisabled] = useState(false)

	const { data: checkFollows, isLoading: isCheckFollowsLoading } = useCheckIfUserFollowsQuery(playlist_id!)

	const { data: currentUser, isFetching: isFetchingUser } = useGetCurrentUserQuery()

	const isCurrentUserOwner = currentUser?.display_name == owner_name

	const { followPlaylist, unfollowPlaylist, isFollowLoading, isUnfollowLoading, isUnfollowSuccess } = usePlaylistMutations({
		currentUser,
		isCurrentUserOwner,
		setDisabled,
	})

	const handleFollowBtnClick = () => {
		if (!isFetchingUser && checkFollows) {
			if (checkFollows[0] === false) {
				if (playlist_id) followPlaylist({ id: playlist_id, public: true })
			} else if (checkFollows[0] === true) {
				if (playlist_id) unfollowPlaylist({ id: playlist_id, public: true })
			}
		}
	}

	const getButtonText = () => {
		if (isFetchingUser || isCheckFollowsLoading || !checkFollows) {
			return ''
		}

		if (currentUser && checkFollows[0] === false) {
			return isCurrentUserOwner ? 'Undo deleting' : 'Follow playlist'
		}

		if (currentUser) {
			return isCurrentUserOwner ? 'Delete created playlist' : 'Unfollow playlist'
		}
		if (isFollowLoading || isUnfollowLoading) return '...'
	}

	useEffect(() => {
		if (isUnfollowSuccess && isCurrentUserOwner) {
			navigate(-1)
		}
	}, [isUnfollowSuccess])

	return (
		<button
			className={clsx(
				styles.action_btn,
				checkFollows?.[0] === false && styles.action_btn__active,
				checkFollows?.[0] === true && styles.action_btn__passive,
				disabled && styles.action_btn__active__disabled,
				disabled && styles.action_btn__passive__disabled
			)}
			onClick={handleFollowBtnClick}
			disabled={disabled}
		>
			{!isFollowLoading || !isUnfollowLoading ? getButtonText() : ''}
			{isFollowLoading || isUnfollowLoading ? <LoaderCircle small={true} /> : ''}
		</button>
	)
}

export default PlaylistActionButton
