import { useEffect } from 'react'
import styles from './Container.module.scss'

type ContainerProps = {
	title?: string
	children: React.ReactNode
}

const Container = ({ title, children }: ContainerProps) => {
	useEffect(() => {
		if (title) document.title = title
	}, [title])

	return <div className={styles.container}>{children}</div>
}

export default Container
