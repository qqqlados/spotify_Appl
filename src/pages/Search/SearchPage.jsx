import React from 'react'
import SearchInput from '../../components/SearchInput/SearchInput'
import styles from './SearchPage.module.scss'

const SearchPage = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Make your search</h1>
			<SearchInput />

			<main>
				<div className='main'>
					{/* {isLoading ? (
						<div>Loading...</div>
					) : data ? (
						albums?.map(item => <p key={item.id}>{item?.name}</p>)
					) : (
						<p>Data not found!</p>
					)} */}
				</div>
			</main>
		</div>
	)
}

export default SearchPage
