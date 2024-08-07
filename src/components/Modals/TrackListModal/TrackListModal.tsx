import React, { FormEvent, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { MdAudiotrack } from 'react-icons/md'
import { useLazyGetSearchTracksQuery } from '../../../api/searchTab'
import ErrorMessage from '../../../shared/ErrorMessage'
import TrackList from '../../Lists/TrackList/TrackList'
import LoaderCircle from '../../Loader/LoaderCircle'
import SearchInput from '../../Search/SearchInput'
import ModalSkeleton from '../ModalSkeleton'
import s from './TrackListModal.module.scss'

type TrackListModalProps = {
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TrackListModal = ({ setModalIsOpen }: TrackListModalProps) => {
	const [search, { data, isFetching, isError }] = useLazyGetSearchTracksQuery()

	const [searchTerm, setSearchTerm] = useState('')

	const trackList = data?.tracks?.items || []

	const imagesTracks = [...(data?.tracks?.items || [])]
		.map(track => track.album)
		.map(el => el.images)
		.flatMap(item => item)
		.filter(el => el.height == 300)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		search(searchTerm)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return (
		<ModalSkeleton modalOpen={setModalIsOpen} title={'Add Track to Playlist'}>
			<div className={s.container}>
				<div className={s.input_area}>
					<div className={s.form__container}>
						<SearchInput onSubmit={handleSubmit} onChange={handleChange} placeholder={'Search tracks here'} />
					</div>
				</div>

				<div className={s.content}>
					{isFetching ? (
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
		</ModalSkeleton>
	)
}

export default TrackListModal
