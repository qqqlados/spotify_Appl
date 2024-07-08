import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavSidebar.module.scss'

const NavSidebar = () => {
	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<ul className={styles.nav_list}>
					<li className={styles.nav_item}>
						<NavLink to='/' className={styles.nav_link}>
							Home
						</NavLink>
					</li>
					<li className={styles.nav_item}>
						<NavLink to='/search' className={styles.nav_link}>
							Search
						</NavLink>
					</li>
					<li className={styles.nav_item}>
						<NavLink className={styles.nav_link} href='#'>
							Recommendations
						</NavLink>
					</li>
					<li className={styles.nav_item}>
						<NavLink className={styles.nav_link} href='#'>
							My Profile
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default NavSidebar
