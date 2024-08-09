import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { setCookies } from '../../providers/AuthProvider'
import styles from './Login.module.scss'

const Login = () => {
	useEffect(() => {
		setCookies()
	}, [])

	console.log(import.meta.env.VITE_REDIRECT_URL + '/login')

	return (
		<motion.div className={styles.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
			<div className={styles.div}>
				<a href='http://localhost:8888/login'>Login!</a>
			</div>
		</motion.div>
	)
}

export default Login
