import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setCookies } from '../../providers/AuthProvider'
import styles from '../Login/UserLogin.module.scss'

const UserLogin = () => {
	const navigate = useNavigate()
	const getCookies = () => {
		console.log(Cookies.get('token'))
	}

	const cookieExists = Cookies.get('token')

	useEffect(() => {
		setCookies()
	}, [])

	return (
		<div className={styles.div}>
			<a href='http://localhost:8888/login'>Login!</a>
			<button onClick={getCookies}>Get Cookies!</button>
		</div>
	)
}

export default UserLogin
