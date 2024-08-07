import clsx from 'clsx'
import { useGetRecommendationsQuery } from '../../../api/tracks'
import { useTrackRecommendations } from '../../../hooks/useTrack'
import ErrorMessage from '../../../shared/ErrorMessage'
import TrackList from '../../Lists/TrackList/TrackList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/Entities/TrackPage/Track.module.scss'

type TrackRecoProps = {
	track_id: string | undefined
	artist_id: string | undefined
}

const TrackRecommendations = ({ track_id, artist_id }: TrackRecoProps) => {
	const { reco } = useTrackRecommendations({ artist_id, track_id })

	const { isLoading, isError } = useGetRecommendationsQuery({ artist_id, track_id })

	const tracks = reco?.tracks || []

	const imagesTracks = reco?.tracks?.map(item => item.album.images.filter(img => img.height == 64)).map(item => item[0]) || []

	return (
		<section className={clsx(s.recommendations, isLoading && s.recommendations__passive)}>
			<h2 className={s.recommendations_title}>
				<span>Recommendations</span>
				<br />
				<span>Based by this track</span>
			</h2>

			{isLoading ? <LoaderCircle /> : isError ? <ErrorMessage /> : <TrackList tracks={tracks} images={imagesTracks} />}
		</section>
	)
}

export default TrackRecommendations
