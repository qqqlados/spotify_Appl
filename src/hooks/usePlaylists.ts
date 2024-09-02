import React, { useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
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
import { IImage } from '../shared/types/image.type'
import { IPlaylistForm } from '../types/forms.types'
import { IPlaylistAddTrack } from '../types/playlist.types'

type PlaylistMutationsType = {
	setModal?: React.Dispatch<React.SetStateAction<boolean>>
	isCurrentUser?: boolean
	setDisabled?: React.Dispatch<React.SetStateAction<boolean>>
}

type HandleToggleType = {
	field: 'public' | 'collaborative'
	formData: IPlaylistForm
	setValue: UseFormSetValue<IPlaylistForm>
}

export const usePlaylist = (playlist_id: string) => {
	const { data, name, description, followers, owner_name, owner_id, imageCover } = useGetPlaylistQuery(playlist_id, {
		skip: !playlist_id,
		selectFromResult: ({ data }) => ({
			data: data,
			name: data?.name,
			description: data?.description,
			tracks: data?.tracks?.items || [],
			imageCover: (data?.images || []).filter((item): item is IImage => item.width === 300 || item.width === null)[0] || null,
			followers: data?.followers?.total || 0,
			owner_name: data?.owner?.display_name,
			owner_id: data?.owner?.id,
		}),
	})

	return { data, name, description, followers, owner_name, owner_id, imageCover }
}

export const usePlaylistTracks = (playlist_id: string | undefined) => {
	const { tracks } = useGetPlaylistTracksQuery(playlist_id!, {
		skip: !playlist_id,
		selectFromResult: ({ data }) => ({
			tracks: [...(data?.items?.map(item => item.track) || [])].filter((track, index, array) => index === array.findIndex(t => t.id === track.id)),
		}),
	})

	return { tracks }
}

export const useCurrentUserPlaylists = () => {
	const { data, playlists } = useGetCurrentUserPlaylistsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			data: data,
			playlists: data?.items || [],
		}),
	})

	return { data, playlists }
}

export const useCheckPlaylist = <T extends IPlaylistAddTrack>(playlistId: string, trackUri: string, addTrack: (params: T) => void) => {
	const [checkPlaylist, { data: playlist }] = useLazyGetPlaylistQuery()

	const checkPlaylistTracks = (id: string) => {
		checkPlaylist(id)
	}

	checkPlaylistTracks(playlistId)

	useEffect(() => {
		if (playlist) {
			const isFoundTrack = playlist?.tracks?.items?.map(item => item?.track?.uri).find(el => el === trackUri)
			if (isFoundTrack) {
				console.log('Track is already on a playlist!')
			} else {
				addTrack({ id: playlist?.id, uris: [trackUri] } as T)
			}
		}
	}, [playlist])
}

export const useHandleToggle = <T extends HandleToggleType>({ field, formData, setValue }: T) => {
	if (field === 'public') {
		setValue('toggles.public', !formData.toggles.public)
		if (formData.toggles.public && formData.toggles.collaborative) {
			setValue('toggles.public', false)
			setValue('toggles.collaborative', false)
		}
	} else if (field === 'collaborative') {
		setValue('toggles.public', !formData.toggles.collaborative)
		setValue('toggles.collaborative', !formData.toggles.collaborative)
	}
}

export const usePlaylistMutations = <T extends PlaylistMutationsType>({ setModal, isCurrentUser, setDisabled }: T) => {
	const [createPlaylist, { data, isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError }] = useCreatePlaylistMutation()

	const [editPlaylist, { data: editData, isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError }] =
		useChangePlaylistDetailsMutation()

	const [followPlaylist, { isLoading: isFollowLoading, isSuccess: isFollowSuccess, isError: isFollowError }] = useFollowPlaylistMutation()
	const [unfollowPlaylist, { isLoading: isUnfollowLoading, isSuccess: isUnfollowSuccess, isError: isUnfollowError }] = useUnfollowPlaylistMutation()

	useEffect(() => {
		if (isCreateSuccess) {
			if (setModal) setModal(false)
			toast.success('Playlist is successfully created.')
		} else if (isEditSuccess) {
			if (setModal) setModal(false)
			toast.success('Playlist is successfully edited.')
		} else if (isCreateError || isEditError) {
			if (setModal) setModal(false)
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
		isUnfollowSuccess,
	}
}
