import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHandleToggle } from '../../../hooks/usePlaylists'
import { IPlaylistForm, playlistFormSchema } from '../../../types/forms.types'
import { IPlaylist } from '../../../types/playlist.types'
import Info from './Info'
import s from './PlaylistForm.module.scss'
import Toggles from './Toggles'

type PlaylistFormProps = {
	data: IPlaylist | undefined
	handleAction: <T extends IPlaylistForm>(formData: T) => void
	action: string
}

const PlaylistForm = ({ data, handleAction, action }: PlaylistFormProps) => {
	// prettier-ignore
	const { register, handleSubmit, reset, setValue, watch, formState: { errors },setError, clearErrors } = useForm<IPlaylistForm>({
		mode: 'onSubmit',
		defaultValues: {
			name: '',
			description: '',
			toggles: {
				public: false,
				collaborative: false,
			},
		},
		resolver: zodResolver(playlistFormSchema),
	})

	const formData = watch()

	const checkboxDisabled = !formData.toggles['public'] && !formData.toggles['collaborative']

	const onSubmit: SubmitHandler<IPlaylistForm> = (formData: IPlaylistForm) => {
		if (checkboxDisabled) {
			setError('toggles', {
				type: 'custom',
				message: 'Your playlist must be either public or collaborative',
			})
			return
		}
		handleAction(formData)
	}

	const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		handleSubmit(onSubmit)()
	}

	useEffect(() => {
		if (!checkboxDisabled) {
			clearErrors('toggles')
		}
	}, [checkboxDisabled])

	useEffect(() => {
		if (data) {
			reset({
				name: data?.name,
				description: data?.description,
				toggles: {
					public: data?.public,
					collaborative: data?.collaborative,
				},
			})
		}
	}, [data, reset])

	return (
		<form className={s.form} onSubmit={onFormSubmit} autoComplete='off'>
			<Info register={register} errors={errors} />

			<Toggles register={register} formData={formData} setValue={setValue} errors={errors} noClick={action == 'change' ? true : false} />

			<input className={s.submit} type='submit' value={action == 'create' ? 'Create' : action == 'change' ? 'Save' : ''} />
		</form>
	)
}

export default PlaylistForm
