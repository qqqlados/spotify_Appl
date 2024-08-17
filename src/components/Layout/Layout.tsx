import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoaderCircle from '../../components/Loader/LoaderCircle'

import styles from './Layout.module.scss'

import Sidebar from './NavigationSidebar/Sidebar'

const Layout = () => {
	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<main className={styles.app}>
				<Suspense fallback={<LoaderCircle />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	)
}

export default Layout
