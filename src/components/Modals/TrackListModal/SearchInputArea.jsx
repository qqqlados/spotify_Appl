import React, { useState } from 'react'
import SearchInput from '../../Search/SearchInput'
import s from './TrackListModal.module.scss'

const SearchInputArea = ({ startSearch }) => {
	const [search, setSearch] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		startSearch(search)
	}

	const handleChange = e => {
		setSearch(e.target.value)
	}

	return (
		<div className={s.form__container}>
			<SearchInput onSubmit={handleSubmit} onChange={handleChange} placeholder={'Search tracks here'} />
		</div>
	)
}

export default SearchInputArea
