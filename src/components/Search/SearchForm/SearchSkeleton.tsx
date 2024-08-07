import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../hooks/redux'
import { ISearchResults } from '../../../types/searchResult.types'
import { filtersIntoUrl, selectFilter } from '../searchSlice'
import Filters from './Filters'
import SearchInputWrapper from './SearchInputWrapper'
import styles from './SearchSkeleton.module.scss'

type SearchSkeletonProps = {
	data: ISearchResults | undefined
	noFilters?: boolean
}

const SearchSkeleton = ({ data, noFilters }: SearchSkeletonProps) => {
	const filter = useAppSelector(selectFilter)

	const dispatch = useDispatch()

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
