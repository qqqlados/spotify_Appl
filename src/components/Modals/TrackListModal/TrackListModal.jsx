import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useLazyGetSearchTracksQuery } from '../../../api/searchTab'
import ModalSkeleton from '../ModalSkeleton'
import SearchInputArea from './SearchInputArea'
import s from './TrackListModal.module.scss'
import TrackList from '/src/components/Lists/TrackList/TrackList'

const TrackListModal = ({ setModalIsOpen }) => {
	const [search, { data, isLoading, isError }] = useLazyGetSearchTracksQuery()

	const trackList = data?.tracks?.items || []

	const imagesTracks = [...(data?.tracks?.items || [])]
		.map(track => track.album)
		.map(el => el.images)
		.flatMap(item => item)
		.filter(el => el.height == 300)

	return (
		<ModalSkeleton modalOpen={setModalIsOpen} title={'Add Track to Playlist'}>
			<div className={s.container}>
				<div className={s.input_area}>
					<SearchInputArea startSearch={search} />
				</div>

				<div className={s.content}>
					{isLoading ? (
						<div>Loading...</div>
					) : isError ? (
						<p>Ooops, there is the server error, try again later.</p>
					) : data ? (
						<TrackList tracks={trackList} images={imagesTracks} addTrack={true} />
					) : (
						''
					)}
				</div>
			</div>
			<Toaster />
		</ModalSkeleton>
	)
}

export default TrackListModal
