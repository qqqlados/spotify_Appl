import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Container from '../../components/ContainerOverall/Container'
import { setCookies } from '../../providers/AuthProvider'
import styles from './Login.module.scss'

const Login = () => {
	useEffect(() => {
		setCookies()
	}, [])

	return (
		<Container title='Login'>
			<motion.div className={styles.wrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
				<div className={styles.div}>
					<a href='http://localhost:8888/login'>Login!</a>
				</div>
			</motion.div>
		</Container>
	)
}

export default Login
