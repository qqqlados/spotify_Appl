import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './Layout.module.scss'

import Sidebar from './NavigationSidebar/Sidebar'

const Layout = () => {
	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<main className={styles.app}>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
