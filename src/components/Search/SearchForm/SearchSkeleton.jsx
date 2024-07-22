import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetSearchResultQuery } from '../../../api/searchTab'
import { filtersIntoUrl, selectFilter, selectSearchTerm, selectUrlFilter } from '../searchSlice'
import Filters from './Filters'
import SearchInputWrapper from './SearchInputWrapper'
import styles from './SearchSkeleton.module.scss'

const SearchSkeleton = ({ data, noFilters }) => {
	const filter = useSelector(selectFilter)
	const urlFilter = useSelector(selectUrlFilter)
	const searchTerm = useSelector(selectSearchTerm)
	const searchPerformed = useSelector(state => state.search.searchPerformed)

	console.log(searchPerformed)

	const dispatch = useDispatch()

	const { data: searchResults, isLoading } = useGetSearchResultQuery(
		{ searchTerm, urlFilter },
		{
			skip: !searchTerm || searchPerformed == false,
		}
	)

	useEffect(() => {
		dispatch(filtersIntoUrl())
	}, [filter])

	return (
		<div className={styles.form_container}>
			<SearchInputWrapper />

			{data && !noFilters ? <Filters /> : ''}
		</div>
	)
}

export default SearchSkeleton
