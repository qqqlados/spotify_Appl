import { useEffect } from 'react'
import toast from 'react-hot-toast'
import {
	useChangePlaylistDetailsMutation,
	useCreatePlaylistMutation,
	useFollowPlaylistMutation,
	useGetCurrentUserPlaylistsQuery,
	useGetPlaylistQuery,
	useGetPlaylistTracksQuery,
	useLazyGetPlaylistQuery,
	useUnfollowPlaylistMutation,
} from '../api/playlist'

export const usePlaylist = playlist_id => {
	const { data, name, description, followers, owner_name, owner_id, imageCover } = useGetPlaylistQuery(playlist_id, {
		skip: !playlist_id,
		selectFromResult: ({ data }) => ({
			data: data,
			name: data?.name,
			description: data?.description,
			tracks: data?.tracks?.items || [],
			imageCover: data?.images?.filter(item => item.width == 300 || item.width == null)[0],
			followers: data?.followers?.total,
			owner_name: data?.owner?.display_name,
			owner_id: data?.owner?.id,
		}),
	})

	return { data, name, description, followers, owner_name, owner_id, imageCover }
}

export const usePlaylistTracks = playlist_id => {
	const { tracks, imagesTracks } = useGetPlaylistTracksQuery(playlist_id, {
		selectFromResult: ({ data }) => ({
			skip: !playlist_id,
			tracks: data?.items?.map(item => item.track).filter((track, index, array) => index === array.findIndex(t => t.id === track.id)),
			imagesTracks: [...(data?.items?.map(item => item.track) || [])]
				.filter((track, index, array) => index === array.findIndex(t => t.id === track.id))
				.map(el => el?.album)
				.map(el => el?.images)
				.flatMap(item => item)
				.filter(el => el?.width == 64 || el?.width == null),
		}),
	})

	return { tracks, imagesTracks }
}

export const useCurrentUserPlaylists = () => {
	const { data, playlists, imagesPlaylists } = useGetCurrentUserPlaylistsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			data: data,
			playlists: data?.items || [],
			imagesPlaylists: data?.items?.map(item => (item?.images ? item?.images[0] : null)),
		}),
	})

	return { data, playlists, imagesPlaylists }
}

export const useCheckPlaylist = (playlistId, trackUri, addTrack) => {
	const [checkPlaylist, { data: playlist, isLoading: isLoadingCheck }] = useLazyGetPlaylistQuery()

	const checkPlaylistTracks = id => {
		checkPlaylist(id)
	}

	checkPlaylistTracks(playlistId)

	useEffect(() => {
		if (playlist) {
			const isFoundTrack = playlist?.tracks?.items?.map(item => item?.track?.id).find(el => el === trackId)
			if (isFoundTrack) {
				console.log('Track is already on a playlist!')
			} else {
				addTrack({ playlistId: playlist?.id, uris: [trackUri] })
			}
		}
	}, [playlist])
}

export const useHandleToggle = (field, formData, setValue) => {
	if (field === 'public') {
		if (formData.public && formData.collaborative) {
			setValue('public', true)
			setValue('collaborative', true)
		} else {
			setValue('public', !formData.public)
		}
	} else if (field === 'collaborative') {
		setValue('public', !formData.collaborative)
		setValue('collaborative', !formData.collaborative)
	}
}

export const usePlaylistMutations = (setModal, isCurrentUser, setDisabled) => {
	const [createPlaylist, { data, isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError }] = useCreatePlaylistMutation()

	const [editPlaylist, { data: editData, isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError }] =
		useChangePlaylistDetailsMutation()

	const [followPlaylist, { isLoading: isFollowLoading, isSuccess: isFollowSuccess, isError: isFollowError }] = useFollowPlaylistMutation()
	const [unfollowPlaylist, { isLoading: isUnfollowLoading, isSuccess: isUnfollowSuccess, isError: isUnfollowError }] = useUnfollowPlaylistMutation()

	useEffect(() => {
		if (isCreateSuccess) {
			setModal(false)
			toast.success('Playlist is successfully created.')
		} else if (isEditSuccess) {
			setModal(false)
			toast.success('Playlist is successfully edited.')
		} else if (isCreateError || isEditError) {
			setModal(false)
			toast.error('Error happened. It may be due to network issue or overlasted access token.', {
				style: {
					textAlign: 'center',
				},
			})
		}
	}, [isCreateSuccess, isCreateError, isEditSuccess, isEditError])

	useEffect(() => {
		if (isFollowSuccess) {
			toast.success('You have successfully followed playlist.')
		} else if (isUnfollowSuccess) {
			if (isCurrentUser) {
				toast.success('Playlist is deleted.')
			} else {
				toast.success('You have successfully unfollowed playlist.')
			}
		} else if (isFollowError || isUnfollowError) {
			toast.error('Error happened. It may be due to network issue or overlasted access token.', {
				style: {
					textAlign: 'center',
				},
			})
		}
	}, [isFollowSuccess, isUnfollowSuccess, isFollowError, isUnfollowError])

	useEffect(() => {
		if (setDisabled) {
			if (isFollowLoading || isUnfollowLoading) {
				setDisabled(true)
			} else {
				setDisabled(false)
			}
		}
	}, [isFollowLoading, isUnfollowLoading])

	return {
		data,
		editData,
		createPlaylist,
		editPlaylist,
		followPlaylist,
		unfollowPlaylist,
		isCreateLoading,
		isEditLoading,
		isFollowLoading,
		isUnfollowLoading,
		isEditError,
		isCreateError,
	}
}
