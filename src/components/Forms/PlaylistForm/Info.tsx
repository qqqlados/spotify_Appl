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
					{errors.name && <FormErrors message={errors.name.message} positionAbsolute={true} top={'5px'} left={'38%'} />}
				</AnimatePresence>
				<input
					className={s.input}
					{...register('name', {
						required: {
							value: true,
							message: "Playlist's name is required",
						},
						minLength: {
							value: 5,
							message: "Playlist's name is too short",
						},
						maxLength: {
							value: 30,
							message: "Playlist's name exceeds permissible word length",
						},
						pattern: {
							value: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9.,':—\-! ]*$/,
							message: "Playlist's name field has invalid characters. You can use only letters, numbers or some other characters",
						},
					})}
					type='text'
					placeholder='Type a name'
				/>
			</div>

			<div className={s.textarea_wrapper}>
				<AnimatePresence>
					{errors.description && <FormErrors message={errors.description.message} positionAbsolute={true} top={'40%'} left={'20%'} />}
				</AnimatePresence>

				<textarea
					className={s.textarea}
					{...register('description', {
						minLength: {
							value: 10,
							message: "Playlist's description cannot be shorter than 20 characters",
						},
						maxLength: {
							value: 120,
							message: "Playlist's description cannot exceed 120 characters",
						},
						pattern: {
							value: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9.,'!:—\- ]*$/,
							message: "Playlist's description field has invalid characters. You can use only letters, numbers or some other symbols",
						},
					})}
					placeholder='Type a description (optional)'
					rows={10}
				></textarea>
			</div>
		</>
	)
}

export default Info
