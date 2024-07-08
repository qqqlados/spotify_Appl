import React from 'react'
import { Link } from 'react-router-dom'
import { useArtistOverall } from '../../../hooks/useArtist'
import { useTrack } from '../../../hooks/useTrack'
import s from '/src/pages/Entities/TrackPage/Track.module.scss'

const TrackTop = ({ track_id, artist_id }) => {
	const { name, album_image, album_name, album_id, artist_name, year, duration } = useTrack(track_id)

	const { artistData, isLoadingArtist, artistImage } = useArtistOverall(artist_id)

	return (
		<section className={s.top}>
			<div className={s.image}>
				<img src={album_image?.url} alt='Album cover' />
			</div>
			<div className={s.description}>
				<p className={s.title}>Track</p>
				<h1 className={s.title_track}>{name}</h1>
				<div className={s.info_row}>
					<div className={s.artist_image}>{isLoadingArtist ? <span>...</span> : <img src={artistImage?.url} alt='' width={40} height={40} />}</div>
					<Link to={`/artist/${artistData?.id}`} className={s.artist}>
						{artist_name}
					</Link>
					<Link to={`/album/${album_id}`} className={s.album}>
						{album_name}
					</Link>
					<span className={s.year}>{year}</span>
					<span className={s.duration}>{duration}</span>
				</div>
			</div>
		</section>
	)
}

export default TrackTop
