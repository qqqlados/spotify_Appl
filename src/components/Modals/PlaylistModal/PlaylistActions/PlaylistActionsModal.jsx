import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPlaylistQuery } from '../../../../api/playlist'
import { usePlaylistMutations } from '../../../../hooks/usePlaylists'
import ModalSkeleton from '../../ModalSkeleton'
import PlaylistForm from '/src/components/Forms/PlaylistForm/PlaylistForm'
import LoaderCircle from '/src/components/Loader/LoaderCircle'

const PlaylistActionsModal = ({ setModalCreatePl, setModalChangePl, setModalOptions, userId, title, action }) => {
	const { playlist_id } = useParams()

	const { data: playlistInfo, isError: isPlaylistError } = useGetPlaylistQuery(playlist_id, {
		skip: !playlist_id && action == 'create',
	})

	const { createPlaylist, editPlaylist, editData, isEditLoading, isEditSuccess, isCreateError, isCreateLoading } = usePlaylistMutations(
		setModalCreatePl ? setModalCreatePl : setModalChangePl
	)

	const handleCreate = formData => {
		createPlaylist({ userId, ...{ name: formData.name, description: formData.description, ...formData.toggle } })
	}

	const handleSave = formData => {
		editPlaylist({
			playlistId: playlist_id,
			...{ name: formData.name, description: formData.description, ...formData.toggle },
		})
	}

	return (
		<ModalSkeleton modalOpen={setModalChangePl || setModalCreatePl} setModalOptions={setModalOptions} title={title}>
			<PlaylistForm
				data={action == 'change' ? playlistInfo : ''}
				handleAction={action == 'create' ? handleCreate : action == 'change' ? handleSave : null}
				action={action}
			/>

			{isEditLoading || isCreateLoading ? <LoaderCircle /> : ''}
		</ModalSkeleton>
	)
}

export default PlaylistActionsModal
