import React from 'react'
import AlbumsList from '../../components/Album/AlbumsList'
import styles from './HomePage.module.scss'

const HomePage = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>New Releases</h1>
			<AlbumsList />
		</div>
	)
}

export default HomePage
