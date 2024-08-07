import { useGetTopTracksQuery } from '../../../api/artists'
import { useArtistTopTracks } from '../../../hooks/useArtist'
import ErrorMessage from '../../../shared/ErrorMessage'
import TrackList from '../../Lists/TrackList/TrackList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/Entities/ArtistPage/Artist.module.scss'

const ArtistPopularTracks = ({ artist_id }: { artist_id: string | undefined }) => {
	const { tracks, tracksImages } = useArtistTopTracks(artist_id!)

	const { isLoading, isError } = useGetTopTracksQuery(artist_id!, { skip: !artist_id })

	return (
		<div className={s.popular_tracks}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : (
				<>
					<h2 className={s.title}>Popular Tracks</h2>
					<TrackList tracks={tracks} images={tracksImages} />
				</>
			)}
		</div>
	)
}

export default ArtistPopularTracks
