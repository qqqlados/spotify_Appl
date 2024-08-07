import React from 'react'
import s from './IconDnd.module.scss'
import iconDnd from '/src/shared/assets/imgs/arrow_vertical.svg'

const Icon = () => {
	return (
		<div className={s.wrapper}>
			<img src={iconDnd} alt='' />
		</div>
	)
}

export default Icon
