import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPlaylistQuery } from '../../../../api/playlist'
import { usePlaylistMutations } from '../../../../hooks/usePlaylists'
import { IPlaylistForm } from '../../../../types/forms.types'
import { IPlaylist } from '../../../../types/playlist.types'
import PlaylistForm from '../../../Forms/PlaylistForm/PlaylistForm'
import LoaderCircle from '../../../Loader/LoaderCircle'
import ModalSkeleton from '../../ModalSkeleton'

type PlaylistActionsProps<T> = {
	setModal: T
	userId?: string
	title?: string
	action: 'create' | 'change'
}

type SetModalType = React.Dispatch<React.SetStateAction<boolean>>

const PlaylistActionsModal = ({ setModal, userId, title, action }: PlaylistActionsProps<SetModalType>) => {
	const { playlist_id } = useParams()

	const { data: playlistInfo } = useGetPlaylistQuery(playlist_id, {
		skip: !playlist_id && action == 'create',
	})

	const { createPlaylist, editPlaylist, editData, isEditLoading, isCreateLoading } = usePlaylistMutations({
		setModal,
	})

	const handleCreate = (formData: IPlaylistForm) => {
		if (userId) {
			const createData: IPlaylist = {
				id: userId,
				...{ name: formData.name, description: formData.description, ...formData.toggles },
			}
			createPlaylist(createData)
		}
	}

	const handleSave = (formData: IPlaylistForm) => {
		if (playlist_id) {
			const editData: IPlaylist = {
				id: playlist_id,
				name: formData.name,
				description: formData.description,
				...formData.toggles,
			}

			editPlaylist(editData)
		}
	}

	return (
		<ModalSkeleton modalOpen={setModal} title={title ? title : ''}>
			<PlaylistForm
				data={action == 'change' ? playlistInfo : undefined}
				handleAction={
					action == 'create'
						? handleCreate
						: action == 'change'
						? handleSave
						: () => {
								throw new Error('Invalid action')
						  }
				}
				action={action}
			/>

			{isEditLoading || isCreateLoading ? <LoaderCircle /> : ''}
		</ModalSkeleton>
	)
}

export default PlaylistActionsModal
