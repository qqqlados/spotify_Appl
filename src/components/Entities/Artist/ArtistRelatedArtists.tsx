import { useGetRelatedArtistsQuery } from '../../../api/artists'
import { useRelatedArtists } from '../../../hooks/useArtist'
import ErrorMessage from '../../../shared/ErrorMessage'
import ArtistsList from '../../Lists/ArtistsList/ArtistsList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/Entities/ArtistPage/Artist.module.scss'

const ArtistRelatedArtists = ({ artist_id }: { artist_id: string | undefined }) => {
	const { relatedArtists, artistsImages } = useRelatedArtists(artist_id!)

	const { isLoading, isError } = useGetRelatedArtistsQuery(artist_id!, { skip: !artist_id })

	return (
		<div className={s.related_artists}>
			<h2 className={s.title}>Also liked</h2>
			<div className={s.content}>
				{isLoading ? <LoaderCircle /> : isError ? <ErrorMessage /> : <ArtistsList artists={relatedArtists} images={artistsImages} />}
			</div>
		</div>
	)
}

export default ArtistRelatedArtists
