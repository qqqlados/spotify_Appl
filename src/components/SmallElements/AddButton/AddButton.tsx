import { FaRegPlusSquare } from 'react-icons/fa'
import styles from './AddButton.module.scss'

type AddButtonProps = {
	handleFunction: (e: React.MouseEvent<HTMLDivElement>) => void
}

const AddButton = ({ handleFunction }: AddButtonProps) => {
	return (
		<div className={styles.add} onClick={e => handleFunction(e)}>
			<FaRegPlusSquare />
		</div>
	)
}

export default AddButton
