import clsx from 'clsx'
import { useState } from 'react'
import { PiPlaylistLight } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { IImage } from '../../../shared/types/image.type'
import { IPlaylist } from '../../../types/playlist.types'
import styles from './PlaylistsList.module.scss'

type PlaylistsListProps = {
	playlists: IPlaylist[]
	short?: boolean
}

const PlaylistsList = ({ playlists, short }: PlaylistsListProps) => {
	const [expandedList, setExpandedList] = useState(false)

	const playlistsToMap = short ? (expandedList ? playlists : playlists.slice(0, 3)) : playlists

	return (
		<>
			<div className={clsx(styles.container, { [styles.expanded]: expandedList, [styles.short]: short })}>
				{playlistsToMap?.map((item, index) => (
					<div key={item?.id} className={styles.container_item}>
						<Link to={`/playlist/${item?.id}`} className={styles.item}>
							<div className={styles.image}>
								{item.images! !== null && item.images!.length > 0 ? (
									<img src={item.images![0].url} alt='Playlist cover' width={320} height={320} />
								) : (
									<div className={styles.image_default}>
										<PiPlaylistLight />
									</div>
								)}
							</div>
							<p className={styles.title}>{playlists[index]?.name}</p>
						</Link>
					</div>
				))}
			</div>
			{short && playlists.length > 5 && (
				<div className={clsx(styles.btn_more, expandedList && styles.position)} onClick={() => setExpandedList(prev => !prev)}>
					<span>{expandedList ? 'hide' : 'more ...'}</span>
				</div>
			)}
		</>
	)
}

export default PlaylistsList
