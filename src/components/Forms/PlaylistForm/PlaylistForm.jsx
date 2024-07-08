import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHandleToggle } from '../../../hooks/usePlaylists'
import Info from './Info'
import s from './PlaylistForm.module.scss'
import Toggles from './Toggles'

const PlaylistForm = ({ data, handleAction, action }) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm({
		mode: 'onSubmit',
		defaultValues: {
			name: '',
			description: '',

			public: false,
			collaborative: false,
		},
	})

	const formData = watch()

	const checkboxDisabled = !formData['public'] && !formData['collaborative']

	const onSubmit = (formData, event) => {
		event.preventDefault()

		if (checkboxDisabled) {
			setError('toggleError', {
				type: 'custom',
				message: 'Your playlist must be either public or collaborative',
			})
			return
		}
		handleAction(formData)
	}

	useEffect(() => {
		if (!checkboxDisabled) {
			clearErrors('toggleError')
		}
	}, [checkboxDisabled])

	useEffect(() => {
		if (data) {
			reset({
				name: data?.name,
				description: data?.description,

				public: data?.public,
				collaborative: data?.collaborative,
			})
		}
	}, [data, reset])

	const toggleHandlers = {
		public: {
			register: register('public'),
			toggle: () => useHandleToggle('public', formData, setValue),
		},
		collaborative: {
			register: register('collaborative'),
			toggle: () => useHandleToggle('collaborative', formData, setValue),
		},
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
			<Info errors={errors} register={register} />

			<Toggles errors={errors} toggleHandlers={toggleHandlers} noClick={action == 'change' ? true : false} />

			<input className={s.submit} type='submit' value={action == 'create' ? 'Create' : action == 'change' ? 'Save' : ''} />
		</form>
	)
}

export default PlaylistForm
