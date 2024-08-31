import { AnimatePresence } from 'framer-motion'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IPlaylistForm } from '../../../types/forms.types'
import FormErrors from '../FormErrors'
import s from './PlaylistForm.module.scss'

type InfoProps = {
	errors: FieldErrors<IPlaylistForm>
	register: UseFormRegister<IPlaylistForm>
}

const Info = ({ errors, register }: InfoProps) => {
	return (
		<>
			<div className={s.input_wrapper}>
				<AnimatePresence>
					{errors.name && <FormErrors message={errors.name.message} positionAbsolute={true} top={'5px'} width={'50%'} />}
				</AnimatePresence>
				<input className={s.input} {...register('name')} type='text' placeholder='Type a name' />
			</div>

			<div className={s.textarea_wrapper}>
				<AnimatePresence>
					{errors.description && <FormErrors message={errors.description.message} positionAbsolute={true} top={'40%'} />}
				</AnimatePresence>

				<textarea className={s.textarea} {...register('description')} placeholder='Type a description (optional)' rows={10}></textarea>
			</div>
		</>
	)
}

export default Info
