import React from 'react'
import { Outlet } from 'react-router-dom'
<<<<<<< HEAD
import NavSidebar from '../NavigationSidebar/NavSidebar'
import styles from './Layout.module.scss'
=======
import styles from './Layout.module.scss'
import Sidebar from './NavigationSidebar/Sidebar'
>>>>>>> 4f0b9ac (first release)

const Layout = () => {
	return (
		<div className={styles.wrapper}>
<<<<<<< HEAD
			<NavSidebar />
			<main className='App'>
=======
			<Sidebar />
			<main className={styles.app}>
>>>>>>> 4f0b9ac (first release)
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
