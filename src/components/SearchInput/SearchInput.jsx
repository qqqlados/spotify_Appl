import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useLazyGetSearchResultQuery } from '../../api/searchTab'
import { handleFilterSearch } from '../../hooks/useSearchFilters'
import styles from './SearchInput.module.scss'

const SearchInput = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [filter, setFilter] = useState({
		album: true,
		playlist: false,
		track: false,
	})
	const [urlFilter, setUrlFilter] = useState([])

	const [
		trigger,
		{ data, isError, isLoading, isFetching, error },
		lastPromiseInfo,
	] = useLazyGetSearchResultQuery()

	const albums = data?.playlists?.items

	useEffect(() => {
		const filter_keys = Object.keys(filter).filter(item => filter[item] == true)

		if (filter_keys.length >= 1) {
			if (filter_keys.length > 1) {
				const filter_final = filter_keys.map(item => item).join('%2C')
				setUrlFilter(filter_final)
			} else {
				setUrlFilter(...filter_keys)
			}
		}
	}, [filter])

	useEffect(() => {
		if (searchTerm) {
			trigger({ searchTerm, urlFilter })
		}
	}, [urlFilter])

	console.log(data)

	return (
		<div className={styles.form_container}>
			<form className={styles.form} onSubmit={e => e.preventDefault()}>
				<input
					className={styles.input}
					id='search'
					type='text'
					placeholder='Search'
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<input
					className={styles.submit}
					type='submit'
					value='Go'
					onClick={() => trigger({ searchTerm, urlFilter })}
				/>
			</form>
			<div className={styles.filter_container}>
				<button
					className={clsx(styles.filter, filter.album && styles.filter_active)}
					onClick={() => handleFilterSearch('album')}
				>
					Albums
				</button>
				<button
					className={clsx(
						styles.filter,
						filter.playlist && styles.filter_active
					)}
					onClick={() => handleFilterSearch('playlist')}
				>
					Playlists
				</button>
				<button
					className={clsx(styles.filter, filter.track && styles.filter_active)}
					onClick={() => handleFilterSearch('track')}
				>
					Tracks
				</button>
			</div>
			{isLoading ? (
				<div>Loading...</div>
			) : data ? (
				albums?.map(item => <p key={item.id}>{item?.name}</p>)
			) : (
				<p>Data not found!</p>
			)}
		</div>
	)
}

export default SearchInput
