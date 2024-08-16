import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLazyGetSearchResultQuery } from '../../../api/searchTab'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { ISearchForm, searchSchema } from '../../../types/forms.types'
import FormErrors from '../../Forms/FormErrors'
import SearchInput from '../SearchInput'
import { disableFilters, selectSearchTerm, setFilters, setSearchTerm } from '../searchSlice'

const SearchInputWrapper = () => {
	const [getSearchResult] = useLazyGetSearchResultQuery()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISearchForm>({ mode: 'onSubmit', resolver: zodResolver(searchSchema) })

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const urlFilter = useAppSelector(state => state.search.urlFilters)

	const searchTerm = useAppSelector(selectSearchTerm)

	const onSubmit: SubmitHandler<ISearchForm> = (data: ISearchForm) => {
		dispatch(setFilters())
		dispatch(setSearchTerm(data.query))
	}

	useEffect(() => {
		if (searchTerm) {
			if (searchTerm) getSearchResult({ searchTerm, urlFilter }, true)
			navigate(`?q=${searchTerm}`)

			document.title = searchTerm
		}
	}, [searchTerm])

	const onChange = () => {
		dispatch(disableFilters())
	}

	return (
		<>
			<SearchInput register={register('query', { onChange: onChange })} onSubmit={handleSubmit(onSubmit)} placeholder={'Type search here'} />

			{errors.query && <FormErrors message={errors.query.message} positionAbsolute={true} bottom='-30px' />}
		</>
	)
}

export default SearchInputWrapper
