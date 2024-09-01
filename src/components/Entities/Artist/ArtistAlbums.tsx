import { useGetArtistAlbumsQuery } from '../../../api/artists'
import { useArtistAlbums } from '../../../hooks/useArtist'
import ErrorMessage from '../../../shared/ErrorMessage'
import AlbumsList from '../../Lists/AlbumsList/AlbumsList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/Entities/ArtistPage/Artist.module.scss'

const ArtistAlbums = ({ artist_id }: { artist_id: string | undefined }) => {
	const { albums } = useArtistAlbums(artist_id!)

	const { isLoading, isError } = useGetArtistAlbumsQuery(artist_id!, { skip: !artist_id })

	return (
		<div className={s.albums}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : (
				<>
					<h2 className={s.title}>Albums</h2>
					<AlbumsList albums={albums} />
				</>
			)}
		</div>
	)
}

export default ArtistAlbums
