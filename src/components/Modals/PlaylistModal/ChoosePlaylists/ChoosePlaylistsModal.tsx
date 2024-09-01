import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { PiPlaylistLight } from 'react-icons/pi'
import { useGetCurrentUserQuery } from '../../../../api/user'
import { useCurrentUserPlaylists } from '../../../../hooks/usePlaylists'
import { useAddTrack } from '../../../../hooks/useTrack'
import { IImage } from '../../../../shared/types/image.type'
import LoaderCircle from '../../../Loader/LoaderCircle'
import ModalSkeleton from '../../ModalSkeleton'
import s from './ChoosePlaylistsModal.module.scss'

type ChoosePlaylistsModalProps = {
	setChoosePlaylistsModal: React.Dispatch<React.SetStateAction<boolean>>
	trackUri: string
	trackId: string
}

const ChoosePlaylistsModal = ({ setChoosePlaylistsModal, trackUri, trackId }: ChoosePlaylistsModalProps) => {
	const [mutation, setMutation] = useState<string | boolean | null>(null)

	const [playlistId, setPlaylistId] = useState<string | undefined>()

	const { playlists } = useCurrentUserPlaylists()

	const { data: currentUser } = useGetCurrentUserQuery()

	const filteredPlaylists = playlists ? playlists?.filter(item => item?.owner?.display_name === currentUser?.display_name) : []

	const images = filteredPlaylists?.map(item => (item?.images ? item?.images[0] : null))

	const closeModal = () => setChoosePlaylistsModal(false)

	const { checkPlaylistTracks, loaderCircle } = useAddTrack({
		playlist_id: playlistId,
		id: trackId,
		trackUri,
		setLoaderCircle: setMutation,
		loaderCircle: mutation,
		closeModal: closeModal,
	})

	useEffect(() => {
		if (playlistId) {
			checkPlaylistTracks()
		}
	}, [playlistId])

	return (
		<ModalSkeleton modalOpen={setChoosePlaylistsModal} title={'Choose Playlist to Add Track'}>
			<ul className={s.list}>
				{filteredPlaylists?.map((item, index) => (
					<li className={s.item} onClick={() => setPlaylistId(item?.id)} key={item.id}>
						<div className={s.image}>{images[index] ? <img src={images[index]?.url} /> : <PiPlaylistLight />}</div>
						<p className={s.name}>{item?.name}</p>
					</li>
				))}
			</ul>
			{loaderCircle == 'loader circle started' && <LoaderCircle />}
			<Toaster />
		</ModalSkeleton>
	)
}

export default ChoosePlaylistsModal
