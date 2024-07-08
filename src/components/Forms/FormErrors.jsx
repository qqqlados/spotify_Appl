import { motion } from 'framer-motion'
import React from 'react'
import s from './FormErrors.module.scss'

const FormErrors = ({ message, positionAbsolute, top, left }) => {
	const position = positionAbsolute
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
