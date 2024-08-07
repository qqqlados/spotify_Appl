import { MotionStyle, motion } from 'framer-motion'
import s from './FormErrors.module.scss'

type FormErrorsProps = {
	message: string | undefined
	positionAbsolute?: boolean
	top?: string
	left?: string
}

const FormErrors = ({ message, positionAbsolute, top, left }: FormErrorsProps) => {
	const position: MotionStyle | {} = positionAbsolute
		? {
				position: 'absolute',
				top: `${top}`,
				left: `${left}`,
		  }
		: {}

	return (
		<motion.div
			className={s.container}
			style={{ ...position }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.1 }}
		>
			{message}
		</motion.div>
	)
}

export default FormErrors
