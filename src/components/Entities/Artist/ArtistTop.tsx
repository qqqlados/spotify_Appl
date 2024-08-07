import { useRef } from 'react'
import { useGetArtistQuery } from '../../../api/artists'
import ErrorMessage from '../../../shared/ErrorMessage'
import LoaderCircle from '../../Loader/LoaderCircle'
import ArtistFollowButton from './ArtistFollowButton'
import s from '/src/pages/Entities/ArtistPage/Artist.module.scss'

const ArtistTop = ({ artist_id }: { artist_id: string | undefined }) => {
	const top = useRef<HTMLDivElement>(null)

	const { data: artistData, isLoading, isError } = useGetArtistQuery(artist_id!, { skip: !artist_id })

	const artistImage = artistData?.images?.filter(img => img.height == 320)[0]

	return (
		<div className={s.top} ref={top}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : artistData ? (
				<>
					<div className={s.top_image}>{artistImage ? <img src={artistImage?.url} alt='Artist Image' /> : <img src='/src/A-Cat.jpg' />}</div>

					<div className={s.info}>
						<h1 className={s.name}>{artistData?.name}</h1>
						<div className={s.info_row}>
							<p className={s.followers}>Followers: {artistData?.followers?.total}</p>
							<p className={s.genres}>Genres: {artistData?.genres?.map((genre, index, array) => genre + (index === array.length - 1 ? '' : ', '))}</p>
						</div>
					</div>

					<ArtistFollowButton artist_id={artist_id} />
				</>
			) : (
				''
			)}
		</div>
	)
}

export default ArtistTop
