import clsx from 'clsx'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { IoSearchOutline } from 'react-icons/io5'
import { TfiHome } from 'react-icons/tfi'
import { NavLink } from 'react-router-dom'
import { useResizeSidebar } from '../../../hooks/useResize'
import styles from './Sidebar.module.scss'

const Sidebar = () => {
	const { width, onMouseDown } = useResizeSidebar(80, 440, 250)

	const style = {
		flexBasis: '100%',
		display: 'flex',
		alignItems: 'center',
		flex: '0 1 auto',
		gap: '15px',
		padding: '10px',
		textDecoration: 'none',
		color: 'rgba(255, 255, 255, 0.7)',
	}

	return (
		<div className={styles.container} style={{ flexBasis: `${width}px` }}>
			<nav className={styles.nav}>
				<ul className={styles.nav_list}>
					<li className={styles.nav_item}>
						<NavLink
							to='/'
							className={clsx(styles.nav_link, width == 80 && styles.nav_link_narrow)}
							style={({ isActive }) => {
								return {
									color: isActive ? '#07b607' : '#fff',
									fontWeight: isActive ? 'bold' : 'normal',
								}
							}}
						>
							<TfiHome />
							{width > 80 && 'Home'}
						</NavLink>
					</li>
					<li className={styles.nav_item}>
						<NavLink
							to='/search'
							className={clsx(styles.nav_link, width == 80 && styles.nav_link_narrow)}
							style={({ isActive }) => {
								return {
									color: isActive ? '#07b607' : '#fff',
									fontWeight: isActive ? 'bold' : 'normal',
								}
							}}
						>
							<IoSearchOutline />
							{width > 80 && 'Search'}
						</NavLink>
					</li>
					<li className={styles.nav_item}>
						<NavLink
							to='/my-profile'
							className={clsx(styles.nav_link, width == 80 && styles.nav_link_narrow)}
							style={({ isActive }) => {
								return {
									color: isActive ? '#07b607' : '#fff',
									fontWeight: isActive ? 'bold' : 'normal',
								}
							}}
						>
							<CgProfile />
							{width > 80 && 'My Profile'}
						</NavLink>
					</li>
				</ul>
			</nav>

			<div className={styles.resizable} onMouseDown={onMouseDown}>
				<span></span>
			</div>
		</div>
	)
}

export default Sidebar
