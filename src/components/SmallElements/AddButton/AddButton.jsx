import React from 'react'
import styles from './AddButton.module.scss'

const AddButton = ({ handleFunction }) => {
	return (
		<div className={styles.add} onClick={e => handleFunction(e)}>
			<img src='/public/plus-large-svgrepo-com.svg' width={30} height={30} />
		</div>
	)
}

export default AddButton
