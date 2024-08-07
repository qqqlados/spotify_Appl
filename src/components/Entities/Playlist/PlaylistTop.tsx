import { useState } from 'react'
import { useGetCurrentUserQuery } from '../../../api/user'
import { usePlaylist, usePlaylistTracks } from '../../../hooks/usePlaylists'
import ModalsRoot from '../../Modals/ModalsRoot'
import ThreeDotsOptions from '../../SmallElements/ThreeDotsOptions/ThreeDotsOptions'
import { PlaylistActionButton, PlaylistAddTrackButton, PlaylistImage, PlaylistInfo } from './PlaylistComponents/PlaylistComponents'
import styles from '/src/pages/Entities/PlaylistPage/Playlist.module.scss'

const PlaylistTop = ({ playlist_id }: { playlist_id: string }) => {
	const [modalOptions, setModalOptions] = useState(false)

	const [modalTrackList, setModalTrackList] = useState(false)

	const { data: currentUser } = useGetCurrentUserQuery()

	const { tracks } = usePlaylistTracks(playlist_id)

	const { owner_name, imageCover } = usePlaylist(playlist_id)

	const isCurrentUserOwner = currentUser?.display_name == owner_name

	return (
		<div className={styles.content}>
			<div className={styles.content__top}>
				<PlaylistImage imageCover={imageCover} />

				<PlaylistInfo playlist_id={playlist_id} />

				<div className={styles.options}>
					{isCurrentUserOwner && <ThreeDotsOptions setModalOptions={setModalOptions} />}

					<ModalsRoot
						playlist_id={playlist_id}
						modalOptions={modalOptions}
						setModalOptions={setModalOptions}
						noTracks={tracks?.length < 2 ? true : false}
					/>
				</div>
			</div>

			<section className={styles.buttons__row}>
				<PlaylistActionButton owner_name={owner_name} playlist_id={playlist_id} />

				{isCurrentUserOwner && <PlaylistAddTrackButton modalTrackList={modalTrackList} setModalTrackList={setModalTrackList} />}
			</section>
		</div>
	)
}

export default PlaylistTop
