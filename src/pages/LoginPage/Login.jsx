import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { setCookies } from '../../providers/AuthProvider'
import styles from './Login.module.scss'

const Login = () => {
	const getCookies = () => {
		console.log(Cookies.get('token'))
	}

	useEffect(() => {
		setCookies()
	}, [])

	return (
		<motion.div className={styles.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
			<div className={styles.div}>
				<a href='http://localhost:8888/login'>Login!</a>
				<button onClick={getCookies}>Get Cookies!</button>
			</div>
		</motion.div>
	)
}

export default Login
