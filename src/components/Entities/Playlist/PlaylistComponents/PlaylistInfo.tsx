import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { usePlaylist, usePlaylistTracks } from '../../../../hooks/usePlaylists'
import { timeConverter } from '../../../../shared/TimeConverter'
import { setUserSearchTerm } from '../../../Search/searchSlice'
import styles from '/src/pages/Entities/PlaylistPage/Playlist.module.scss'

const PlaylistInfo = ({ playlist_id }: { playlist_id: string }) => {
	const dispatch = useDispatch()

	const { name, description, followers, owner_name } = usePlaylist(playlist_id)

	const { tracks } = usePlaylistTracks(playlist_id)

	const handleNavigate = () => {
		dispatch(setUserSearchTerm(owner_name))
	}

	const { formatTime } = timeConverter()

	const totalDuration = tracks?.reduce((acc, cur) => {
		acc += cur.duration_ms

		return acc
	}, 0)

	const formattedTime = formatTime(totalDuration)

	const [hours, minutes, seconds] = formattedTime.split(':')

	const followersLastSymbol = followers.toString().split('')[followers.toString().split('').length - 1]

	return (
		<div className={styles.info}>
			<span>Playlist</span>

			<h1 className={styles.name}>{name}</h1>

			{description && <p className={styles.description}>{description}</p>}

			<div className={styles.info__row}>
				<p className={styles.owner__name} onClick={handleNavigate}>
					{<Link to={`/user/${owner_name}`}>{owner_name}</Link>}
				</p>

				{totalDuration > 0 && (
					<div className={styles.playlist_size}>
						<span>
							{tracks?.length} {tracks?.length == 1 ? 'song' : 'songs'},
						</span>
						<span> {Number(hours) > 0 ? `${hours} hr ${Number(minutes) - Number(hours) * 60} min` : `${minutes} min ${seconds} s`}</span>
					</div>
				)}

				<p className={styles.followers}>
					{followers} {followersLastSymbol === '1' ? 'follower' : 'followers'}
				</p>
			</div>
		</div>
	)
}

export default PlaylistInfo
