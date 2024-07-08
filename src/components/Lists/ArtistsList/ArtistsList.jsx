import React from 'react'
import { PiMicrophoneStage } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import s from './ArtistsList.module.scss'

const ArtistsList = ({ artists, images }) => {
	return (
		<div className={s.container}>
			{artists?.map((artist, index) => (
				<Link to={`/artist/${artist?.id}`} className={s.link} key={artist?.id}>
					<div className={s.image}>{images[index]?.url ? <img src={images[index]?.url} alt='Artist Image' /> : <PiMicrophoneStage />}</div>
					<p className={s.name}>{artist?.name}</p>
				</Link>
			))}
		</div>
	)
}

export default ArtistsList
