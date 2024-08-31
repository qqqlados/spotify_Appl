import { AnimatePresence } from 'framer-motion'
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue, FieldValues } from 'react-hook-form'
import { IPlaylistForm } from '../../../types/forms.types'
import FormErrors from '../FormErrors'
import s from './PlaylistForm.module.scss'
import { IPlaylistToggles } from '../../../types/forms.types'
import { useHandleToggle } from '../../../hooks/usePlaylists'

type TogglesProps = {
	register: UseFormRegister<IPlaylistForm>
	formData: IPlaylistForm
	setValue: UseFormSetValue<IPlaylistForm>
	errors: FieldErrors<IPlaylistForm>
	noClick: boolean
}

const Toggles = ({ register, formData, setValue, errors, noClick }: TogglesProps) => {
	return (
		<section className={s.checkbox_info}>
			<AnimatePresence>{errors?.toggles && <FormErrors message={errors?.toggles?.message} positionAbsolute={true} top={'-15px'} />}</AnimatePresence>

			<div className={s.checkbox_info__row}>
				<p className={s.text}>Public</p>
				<label className={s.switch}>
					<input
						type='checkbox'
						{...register}
						onChange={() => useHandleToggle({ field: 'public', formData, setValue })}
						disabled={noClick}
						checked={formData.toggles.public}
					/>
					<span className={`${s.slider} ${s.round}`}></span>
				</label>
			</div>

			<div className={s.checkbox_info__row}>
				<p className={s.text}>Collaborative</p>
				<label className={s.switch}>
					<input
						type='checkbox'
						{...register}
						onChange={() => useHandleToggle({ field: 'collaborative', formData, setValue })}
						disabled={noClick}
						checked={formData.toggles.collaborative}
					/>
					<span className={`${s.slider} ${s.round}`}></span>
				</label>
			</div>
		</section>
	)
}

export default Toggles
