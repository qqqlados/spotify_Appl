import React from 'react'
import { FaRegPlusSquare } from 'react-icons/fa'
import styles from './AddButton.module.scss'

const AddButton = ({ handleFunction }) => {
	return (
		<div className={styles.add} onClick={e => handleFunction(e)}>
			<FaRegPlusSquare />
		</div>
	)
}

export default AddButton
