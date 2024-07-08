import { motion } from 'framer-motion'
import React from 'react'

const ErrorMessage = ({ message }) => {
	return (
		<motion.div
			style={{ maxWidth: '350px', textAlign: 'center', lineHeight: '1.3', fontSize: '20px' }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			{message ? message : <p>Ooops, there is a server error or access token is overlasted.</p>}
		</motion.div>
	)
}

export default ErrorMessage
