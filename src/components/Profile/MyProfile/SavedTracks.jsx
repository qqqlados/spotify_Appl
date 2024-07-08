import React from 'react'
import { useGetSavedAlbumsQuery } from '../../../api/albums'
import { useGetSavedTracksQuery } from '../../../api/tracks'
import { useSavedTracks } from '../../../hooks/useTrack'
import TrackList from '../../Lists/TrackList/TrackList'
import LoaderFullScreen from '../../Loader/LoaderFullScreen'
import s from '/src/pages/Profile/MyProfile/MyProfile.module.scss'

const SavedTracks = () => {
	const { data: savedAlbums } = useGetSavedAlbumsQuery()

	const { tracks: savedTracks, imagesTracks: imagesSavedTracks } = useSavedTracks()

	const { data, isLoading, isError } = useGetSavedTracksQuery(undefined, {
		skip: !savedAlbums,
	})

	return (
		<section className={s.saved_tracks}>
			{isLoading ? (
				<LoaderFullScreen />
			) : isError ? (
				<p>Ooops, there is a server error or access token is overlasted.</p>
			) : savedTracks ? (
				<>
					<h2 className={s.heading}>Saved Tracks</h2>
					<TrackList tracks={savedTracks} images={imagesSavedTracks} />
				</>
			) : (
				''
			)}
		</section>
	)
}

export default SavedTracks
