import React from 'react'
import styles from './SearchInput.module.scss'

const SearchInput = ({ onSubmit, onChange, placeholder, value, register, errors }) => {
	return (
		<>
			<form className={styles.form} onSubmit={e => onSubmit(e)} autoComplete='off'>
				<input
					className={styles.input}
					name='search'
					{...register}
					type='search'
					placeholder={placeholder}
					value={value}
					onChange={e => onChange(e)}
				/>
				<input className={styles.submit} type='submit' />
			</form>
		</>
	)
}

export default SearchInput
