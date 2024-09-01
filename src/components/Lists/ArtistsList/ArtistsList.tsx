import { PiMicrophoneStage } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { IImage } from '../../../shared/types/image.type'
import { IArtist } from '../../../types/artist.types'
import s from './ArtistsList.module.scss'

const ArtistsList = ({ artists }: { artists: IArtist[] }) => {
	return (
		<div className={s.container}>
			{artists?.map(artist => (
				<Link to={`/artist/${artist?.id}`} className={s.link} key={artist?.id}>
					<div className={s.image}>
						{artist?.images! && artist?.images[0]?.url ? <img src={artist?.images[0].url} alt='Artist Image' /> : <PiMicrophoneStage />}
					</div>
					<p className={s.name}>{artist?.name}</p>
				</Link>
			))}
		</div>
	)
}

export default ArtistsList
