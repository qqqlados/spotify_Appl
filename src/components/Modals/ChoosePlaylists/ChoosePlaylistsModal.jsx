import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useGetCurrentUserQuery } from '../../../api/user'
import { useCurrentUserPlaylists } from '../../../hooks/usePlaylists'
import { useAddTrack } from '../../../hooks/useTrack'
import LoaderFullScreen from '../../Loader/LoaderFullScreen'
import ModalSkeleton from '../ModalSkeleton'
import s from './ChoosePlaylistsModal.module.scss'

const ChoosePlaylistsModal = ({ setModalOptions, setChoosePlaylistsModal, trackUri, trackId }) => {
	const { playlists, imagesPlaylists } = useCurrentUserPlaylists()

	const { data: currentUser } = useGetCurrentUserQuery()

	const filteredPlaylists = playlists?.filter(item => item?.owner?.display_name === currentUser?.display_name)

	const filteredImages = filteredPlaylists?.map(item => (item?.images ? item?.images[0] : null))

	console.log(filteredImages)

	const [playlistId, setPlaylistId] = useState(null)

	const { checkPlaylistTracks, isLoadingAddTrack, isSuccessAddTrack, isAddTrackError } = useAddTrack(playlistId, trackId, trackUri)

	useEffect(() => {
		if (playlistId) {
			checkPlaylistTracks()
		}
	}, [playlistId])

	return (
		<ModalSkeleton modalOpen={setChoosePlaylistsModal} setModalOptions={setModalOptions} title={'Choose Playlist to Add Track'}>
			<ul className={s.list}>
				{filteredPlaylists?.map((item, index) => (
					<li className={s.item} onClick={() => setPlaylistId(item?.id)} key={item.id}>
						<div className={s.image}>{filteredImages[index] ? <img src={imagesPlaylists[index]?.url} /> : <img src='/src/A-Cat.jpg' />}</div>
						<p className={s.name}>{item?.name}</p>
						{isLoadingAddTrack && <LoaderFullScreen small={true} />}
					</li>
				))}
			</ul>

			<Toaster />
		</ModalSkeleton>
	)
}

export default ChoosePlaylistsModal
