import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLazyGetSearchResultQuery } from '../../../api/searchTab'
import SearchInput from '../SearchInput'
import { disableFilters, selectSearchTerm, setFilters, setSearchTerm } from '../searchSlice'

const SearchInputWrapper = () => {
	const [getSearchResult] = useLazyGetSearchResultQuery()

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const urlFilter = useSelector(state => state.search.urlFilters)
	const searchTerm = useSelector(selectSearchTerm)
	const searchPerformed = useSelector(state => state.search.searchPerformed)
	const splitSearchTerm = Array.from(searchTerm.split(''))

	const handleSubmit = e => {
		e.preventDefault()
		if (splitSearchTerm.length > 3) {
			getSearchResult({ searchTerm, urlFilter }, true)
			dispatch(setFilters())
			navigate(`?q=${searchTerm}`)
		} else {
			console.log('Your search query cannot contain less than 4 characters.')
		}
	}
	const handleInputChange = e => {
		dispatch(setSearchTerm(e.target.value))

		if (searchPerformed && e.target.value.length < splitSearchTerm.length) {
			dispatch(disableFilters())
		}
	}

	return (
		<SearchInput
			onSubmit={handleSubmit}
			onChange={handleInputChange}
			value={searchTerm}
			placeholder={'Type search here'}
		/>
	)
}

export default SearchInputWrapper
