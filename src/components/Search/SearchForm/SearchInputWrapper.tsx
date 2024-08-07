import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLazyGetSearchResultQuery } from '../../../api/searchTab'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { IMainSearchForm } from '../../../types/forms.types'
import FormErrors from '../../Forms/FormErrors'
import SearchInput from '../SearchInput'
import { disableFilters, selectSearchTerm, setFilters, setSearchTerm } from '../searchSlice'

const SearchInputWrapper = () => {
	const [getSearchResult] = useLazyGetSearchResultQuery()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMainSearchForm>({
		mode: 'onSubmit',
	})

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const urlFilter = useAppSelector(state => state.search.urlFilters)
	const searchTerm = useAppSelector(selectSearchTerm)
	const searchPerformed = useAppSelector(state => state.search.searchPerformed)
	const splitSearchTerm = Array.from(searchTerm.split(''))

	const onSubmit: SubmitHandler<IMainSearchForm> = () => {
		if (splitSearchTerm.length > 3) {
			getSearchResult({ searchTerm, urlFilter }, true)
			dispatch(setFilters())
			navigate(`?q=${searchTerm}`)
		}
	}
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(e.target.value))

		dispatch(disableFilters())
	}

	return (
		<>
			<SearchInput
				register={register('searchString', {
					minLength: {
						value: 4,
						message: 'Your search query cannot contain less than 4 characters',
					},
					maxLength: {
						value: 30,
						message: 'Your search query cannot exceed 30 characters',
					},
				})}
				onSubmit={handleSubmit(onSubmit)}
				onChange={handleInputChange}
				value={searchTerm}
				placeholder={'Type search here'}
			/>
			{errors.searchString && <FormErrors message={errors.searchString.message} />}
		</>
	)
}

export default SearchInputWrapper
