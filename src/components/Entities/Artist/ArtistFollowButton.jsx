import clsx from 'clsx'
import React, { useState } from 'react'
import { useCheckIfCurrentUserFollowsQuery } from '../../../api/artists'
import { useArtistMutations } from '../../../hooks/useArtist'
import LoaderCircle from '/src/components/Loader/LoaderCircle'
import styles from '/src/pages/Entities/ArtistPage/Artist.module.scss'

const ArtistFollowButton = ({ artist_id }) => {
	const [disabled, setDisabled] = useState(false)

	const { data: checkIfFollows, isLoading: isCheckLoading, isFetching: isFetchingCheck } = useCheckIfCurrentUserFollowsQuery(artist_id)

	const { followArtist, unfollowArtist, isFollowLoading, isUnfollowLoading } = useArtistMutations(setDisabled)

	const handleClick = () => {
		if (!isFetchingCheck && checkIfFollows) {
			if (checkIfFollows[0] === false) {
				followArtist({ artistId: artist_id, ...{ ids: [artist_id] } })
			} else if (checkIfFollows[0] === true) {
				unfollowArtist({ artistId: artist_id, ...{ ids: [artist_id] } })
			}
		}
	}

	const getButtonText = () => {
		if (isFetchingCheck || isCheckLoading || !checkIfFollows) {
			return ''
		}
		if (checkIfFollows[0] === false) {
			return 'Follow artist'
		}
		if (checkIfFollows[0] === true) {
			return 'Unfollow artist'
		}
		if (isFollowLoading || isUnfollowLoading) return '...'
	}

	return (
		<>
			<button
				className={clsx(
					styles.action_btn,
					checkIfFollows?.[0] === false && styles.action_btn__active,
					checkIfFollows?.[0] === true && styles.action_btn__passive,
					disabled && styles.action_btn__active__disabled,
					disabled && styles.action_btn__passive__disabled
				)}
				onClick={handleClick}
			>
				{getButtonText()}
				{isFollowLoading || isUnfollowLoading ? <LoaderCircle small={true} /> : ''}
			</button>
		</>
	)
}

export default ArtistFollowButton
