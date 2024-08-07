import React, { FormEvent } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import styles from './SearchInput.module.scss'

type SearchInputProps<T extends FieldValues> = {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	value?: string
	register?: ReturnType<UseFormRegister<T>>
}

const SearchInput = <T extends FieldValues>({ onSubmit, onChange, placeholder, value, register }: SearchInputProps<T>) => {
	return (
		<form className={styles.form} onSubmit={e => onSubmit(e)} autoComplete='off'>
			<input className={styles.input} name='search' {...register} type='search' placeholder={placeholder} value={value} onChange={e => onChange(e)} />
			<input className={styles.submit} type='submit' />
		</form>
	)
}

export default SearchInput
