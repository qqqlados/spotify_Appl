import { AnimatePresence } from 'framer-motion'
import { FieldErrors } from 'react-hook-form'
import { IPlaylistForm } from '../../../types/forms.types'
import FormErrors from '../FormErrors'
import s from './PlaylistForm.module.scss'

type TogglesProps = {
	errors: FieldErrors<IPlaylistForm>
	toggleHandlers: any
	noClick: boolean
}

const Toggles = ({ errors, toggleHandlers, noClick }: TogglesProps) => {
	return (
		<section className={s.checkbox_info}>
			<AnimatePresence>
				{errors?.toggles && <FormErrors message={errors?.toggles?.message} positionAbsolute={true} top={'-15px'} left={'24%'} />}
			</AnimatePresence>

			<div className={s.checkbox_info__row}>
				<p className={s.text}>Public</p>
				<label className={s.switch}>
					<input type='checkbox' {...toggleHandlers.public.register} onChange={toggleHandlers.public.toggle} disabled={noClick} />
					<span className={`${s.slider} ${s.round}`}></span>
				</label>
			</div>

			<div className={s.checkbox_info__row}>
				<p className={s.text}>Collaborative</p>
				<label className={s.switch}>
					<input type='checkbox' {...toggleHandlers.collaborative.register} onChange={toggleHandlers.collaborative.toggle} disabled={noClick} />
					<span className={`${s.slider} ${s.round}`}></span>
				</label>
			</div>
		</section>
	)
}

export default Toggles
