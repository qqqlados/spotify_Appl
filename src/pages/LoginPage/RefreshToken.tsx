import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import styles from './Login.module.scss'

const RefreshToken = () => {
	const cookieExists = Cookies.get('token')

	const [message, setMessage] = useState(false)

	// const navigate = useNavigate()

	useEffect(() => {
		if (!cookieExists) {
			setMessage(true)
		}
	}, [cookieExists])

	return (
		<motion.div
			className={styles.refresh_token}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			{message && (
				<>
					<p>Your session is expired. Please navigate to the main page and log in again.</p>
					<button onClick={() => (window.location.href = '/login')}>Navigate to main page</button>
				</>
			)}
		</motion.div>
	)
}

export default RefreshToken
