import React from 'react'
import { Toaster } from 'react-hot-toast'
import { MdAudiotrack } from 'react-icons/md'
import { useLazyGetSearchTracksQuery } from '../../../api/searchTab'
import ModalSkeleton from '../ModalSkeleton'
import SearchInputArea from './SearchInputArea'
import s from './TrackListModal.module.scss'
import TrackList from '/src/components/Lists/TrackList/TrackList'
import LoaderCircle from '/src/components/Loader/LoaderCircle'
import ErrorMessage from '/src/shared/ErrorMessage'

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
						<LoaderCircle />
					) : isError ? (
						<ErrorMessage />
					) : data ? (
						<TrackList tracks={trackList} images={imagesTracks} addTrack={true} />
					) : (
						<div className={s.icon}>
							<MdAudiotrack />
						</div>
					)}
				</div>
			</div>
			<Toaster />
			{/* {mutationAction && <LoaderCircle />} */}
		</ModalSkeleton>
	)
}

export default TrackListModal
