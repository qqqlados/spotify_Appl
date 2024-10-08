import { Link } from 'react-router-dom'
import { useGetArtistQuery } from '../../../api/artists'
import { timeConverter } from '../../../shared/TimeConverter'
import { IAlbum } from '../../../types/album.types'
import { ITrack } from '../../../types/track.types'
import styles from '/src/pages/Entities/AlbumPage/Album.module.scss'

type AlbumInfoProps = {
	album: IAlbum
	tracks: ITrack[]
}

const AlbumInfo = ({ album, tracks }: AlbumInfoProps) => {
	const artist_id = album?.artists[0]?.id

	const { data } = useGetArtistQuery(artist_id)

	const artistImage = data?.images?.filter(img => img.height == 320)[0]

	const { formatTime } = timeConverter()

	const totalDuration = tracks.reduce((acc, cur) => {
		acc += cur.duration_ms

		return acc
	}, 0)

	const formattedTime = formatTime(totalDuration)

	const [hours, minutes, seconds] = formattedTime.split(':')

	return (
		<div className={styles.info}>
			<span>Album</span>

			<h1 className={styles.name}>
				{album?.name}
				{/* Getting Away */}
			</h1>

			<div className={styles.info__row}>
				<div className={styles.artist}>
					<div className={styles.artist__image}>
						<img src={artistImage?.url} alt='' />
					</div>
					{album?.artists?.map((artist, index) => (
						<Link to={`/artist/${artist.id}`} className={styles.artist__name} key={artist.id}>
							<span>
								{artist.name}
								{index == album.artists.length - 1 ? '' : ','}
							</span>
						</Link>
					))}
				</div>

				<span className={styles.year}>{album?.release_date.substring(0, 4)}</span>

				<p className={styles.popularity}>{album.popularity} place</p>

				<div className={styles.album_size}>
					<span>
						{tracks?.length} {tracks?.length == 1 ? 'song' : 'songs'},{' '}
					</span>
					<span>{Number(hours) > 0 ? `${hours} hr ${Number(minutes) - Number(hours) * 60} min` : `${minutes} min ${seconds} s`}</span>
				</div>
			</div>
		</div>
	)
}

export default AlbumInfo
