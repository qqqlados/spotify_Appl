import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useSearchUser } from '../../../hooks/useMyProfile'
import FormErrors from '../../Forms/FormErrors'
import SearchInput from '../../Search/SearchInput'
import { setUserSearchTerm } from '../../Search/searchSlice'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'

const UserSearch = () => {
	const [search, setSearch] = useState('')
	const dispatch = useAppDispatch()
	const userSearchTerm = useAppSelector(state => state.search.userSearchTerm)
	const navigate = useNavigate()
	const { user } = useSearchUser(userSearchTerm)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			username: '',
		},
	})

	const onSubmit = () => {
		dispatch(setUserSearchTerm(search))
		navigate(`/user/${user?.id}`)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const registerParam = {
		...register('username', {
			minLength: {
				value: 4,
				message: 'Usernames usually contain at least 4 characters',
			},
			maxLength: {
				value: 20,
				message: 'Usernames cannot exceed 20 characters',
			},
			pattern: {
				value: /^[a-zA-Zа0-9'-_]*$/,
				message: 'Username has invalid characters',
			},
		}),
	}

	return (
		<section className={s.search_users}>
			<h2 className={s.heading}>Or maybe try to search other users?</h2>
			<div className={s.form__container}>
				<SearchInput
					register={registerParam}
					onSubmit={handleSubmit(onSubmit)}
					onChange={handleInputChange}
					placeholder={userSearchTerm || 'Type the name of user here'}
				/>
			</div>
			{errors.username && <FormErrors message={errors.username.message} />}
		</section>
	)
}

export default UserSearch
