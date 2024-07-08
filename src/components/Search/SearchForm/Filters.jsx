import clsx from 'clsx'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilter, toggleFilters } from '../searchSlice'
import styles from './SearchSkeleton.module.scss'

const Filters = () => {
	const dispatch = useDispatch()
	const filter = useSelector(selectFilter)
	const searchPerformed = useSelector(state => state.search.searchPerformed)

	return (
		<>
			<div className={clsx(styles.filter_container, !searchPerformed && styles.filter_container_passive)}>
				<button
					className={clsx(styles.filter, filter.track && styles.filter_active)}
					onClick={() => {
						if (searchPerformed) {
							dispatch(toggleFilters('track'))
						}
					}}
				>
					Tracks
				</button>
				<button
					className={clsx(styles.filter, filter.album && styles.filter_active)}
					onClick={() => {
						if (searchPerformed) {
							dispatch(toggleFilters('album'))
						}
					}}
				>
					Albums
				</button>
				<button
					className={clsx(styles.filter, filter.playlist && styles.filter_active)}
					onClick={() => {
						if (searchPerformed) {
							dispatch(toggleFilters('playlist'))
						}
					}}
				>
					Playlists
				</button>
			</div>
		</>
	)
}

export default Filters
