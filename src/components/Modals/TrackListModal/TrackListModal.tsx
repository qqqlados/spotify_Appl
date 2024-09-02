import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { MdAudiotrack } from 'react-icons/md'
import { useLazyGetSearchTracksQuery } from '../../../api/searchTab'
import ErrorMessage from '../../../shared/ErrorMessage'
import { ISearchForm, searchSchema } from '../../../types/forms.types'
import FormErrors from '../../Forms/FormErrors'
import TrackList from '../../Lists/TrackList/TrackList'
import LoaderCircle from '../../Loader/LoaderCircle'
import SearchInput from '../../Search/SearchInput'
import ModalSkeleton from '../ModalSkeleton'
import s from './TrackListModal.module.scss'
import { motion } from 'framer-motion'

type TrackListModalProps = {
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TrackListModal = ({ setModalIsOpen }: TrackListModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISearchForm>({
		mode: 'onSubmit',
		resolver: zodResolver(searchSchema),
	})

	const [search, { data, isFetching, isError }] = useLazyGetSearchTracksQuery()

	const trackList = data?.tracks?.items || []

	const onSubmit = (data: ISearchForm) => {
		search(data.query)
	}

	return (
		<ModalSkeleton modalOpen={setModalIsOpen} title={'Add Track to Playlist'}>
			<div className={s.container}>
				<div className={s.input_area}>
					<div className={s.form__container}>
						<SearchInput onSubmit={handleSubmit(onSubmit)} register={register('query')} placeholder={'Search tracks here'} />
						{errors.query && <FormErrors message={errors.query.message} positionAbsolute={true} bottom='-20px' />}
					</div>
				</div>

				<motion.div className={s.content}>
					{isFetching ? (
						<LoaderCircle />
					) : isError ? (
						<ErrorMessage />
					) : data ? (
						<TrackList tracks={trackList} addTrack={true} />
					) : (
						<div className={s.icon}>
							<MdAudiotrack />
						</div>
					)}
				</motion.div>
			</div>
			<Toaster />
		</ModalSkeleton>
	)
}

export default TrackListModal
