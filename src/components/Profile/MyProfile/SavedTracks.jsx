import React from 'react'
import { useGetSavedAlbumsQuery } from '../../../api/albums'
import { useGetSavedTracksQuery } from '../../../api/tracks'
import { useSavedTracks } from '../../../hooks/useTrack'
import TrackList from '../../Lists/TrackList/TrackList'
import LoaderCircle from '../../Loader/LoaderCircle'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'
import ErrorMessage from '/src/shared/ErrorMessage'

const SavedTracks = () => {
	const { data: savedAlbums } = useGetSavedAlbumsQuery()

	const { tracks: savedTracks, imagesTracks: imagesSavedTracks } = useSavedTracks()

	const { data, isLoading, isError } = useGetSavedTracksQuery(undefined, {
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
					<TrackList tracks={savedTracks} images={imagesSavedTracks} short={true} />
				</>
			) : (
				''
			)}
		</section>
	)
}

export default SavedTracks
