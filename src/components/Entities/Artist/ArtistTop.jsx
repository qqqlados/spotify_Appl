import React, { useRef } from 'react'
import { useArtistOverall } from '../../../hooks/useArtist'
import ArtistFollowButton from './ArtistFollowButton'
import s from '/src/pages/Entities/ArtistPage/Artist.module.scss'

const ArtistTop = ({ artist_id }) => {
	const top = useRef()

	const { artistData, artistImage, isArtistLoading, isArtistError } = useArtistOverall(artist_id)

	return (
		<div className={s.top} ref={top}>
			<div className={s.top_image}>{artistImage ? <img src={artistImage?.url} alt='Artist Image' /> : <img src='/src/A-Cat.jpg' />}</div>

			<div className={s.info}>
				<h1 className={s.name}>{artistData?.name}</h1>
				<div className={s.info_row}>
					<p className={s.followers}>Followers: {artistData?.followers?.total}</p>
					<p className={s.genres}>Genres: {artistData?.genres?.map((genre, index, array) => genre + (index === array.length - 1 ? '' : ', '))}</p>
				</div>
			</div>

			<ArtistFollowButton artist_id={artist_id} />
		</div>
	)
}

export default ArtistTop
