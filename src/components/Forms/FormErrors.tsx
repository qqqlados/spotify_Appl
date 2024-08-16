import { MotionStyle, motion } from 'framer-motion'
import s from './FormErrors.module.scss'

type FormErrorsProps = {
	message: string | undefined
	positionAbsolute?: boolean
	top?: string
	bottom?: string
	style?: string
}

const FormErrors = ({ message, positionAbsolute, top, bottom, style }: FormErrorsProps) => {
	const styling: MotionStyle | {} = positionAbsolute
		? {
				position: 'absolute',
				top: `${top}`,
				bottom: `${bottom}`,
		  }
		: style
		? {
				color: style,
		  }
		: {}

	return (
		<motion.div
			className={s.container}
			style={{ ...styling }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.1 }}
		>
			<p>{message}</p>
		</motion.div>
	)
}

export default FormErrors
