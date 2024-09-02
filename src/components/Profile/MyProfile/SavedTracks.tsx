import { useGetSavedAlbumsQuery } from '../../../api/albums'
import { useGetSavedTracksQuery } from '../../../api/tracks'
import { useSavedTracks } from '../../../hooks/useTrack'
import ErrorMessage from '../../../shared/ErrorMessage'
import TrackList from '../../Lists/TrackList/TrackList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'

const SavedTracks = () => {
	const { data: savedAlbums } = useGetSavedAlbumsQuery()

	const { tracks: savedTracks } = useSavedTracks()

	const { isLoading, isError } = useGetSavedTracksQuery(undefined, {
		skip: !savedAlbums,
	})

	return (
		<section className={s.saved_tracks}>
			{isLoading ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : savedTracks ? (
				<>
					<h2 className={s.heading}>Saved Tracks</h2>
					<TrackList tracks={savedTracks} short={true} />
				</>
			) : (
				''
			)}
		</section>
	)
}

export default SavedTracks
