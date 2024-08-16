import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useSearchUser } from '../../../hooks/useMyProfile'
import { IUserSearchForm, userSearchSchema } from '../../../types/forms.types'
import FormErrors from '../../Forms/FormErrors'
import SearchInput from '../../Search/SearchInput'
import { setUserSearchTerm } from '../../Search/searchSlice'
import s from '/src/pages/ProfilePage/MyProfile/MyProfile.module.scss'

const UserSearch = () => {
	const dispatch = useAppDispatch()
	const userSearchTerm = useAppSelector(state => state.search.userSearchTerm)
	const navigate = useNavigate()
	const { user } = useSearchUser(userSearchTerm)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserSearchForm>({
		mode: 'onSubmit',
		defaultValues: {
			username: '',
		},
		resolver: zodResolver(userSearchSchema),
	})

	const onSubmit = (data: IUserSearchForm) => {
		dispatch(setUserSearchTerm(data.username))
		navigate(`/user/${user?.id}`)
	}

	return (
		<section className={s.search_users}>
			<h2 className={s.heading}>Or maybe try to search other users?</h2>
			<div className={s.form__container}>
				<SearchInput register={register('username')} onSubmit={handleSubmit(onSubmit)} placeholder={userSearchTerm || 'Type the name of user here'} />
				{errors.username && <FormErrors message={errors.username.message} positionAbsolute={true} bottom='-20px' />}
			</div>
		</section>
	)
}

export default UserSearch
