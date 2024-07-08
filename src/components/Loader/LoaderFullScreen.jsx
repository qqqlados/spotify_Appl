import clsx from 'clsx'
import React from 'react'
import './style.scss'

const LoaderFullScreen = ({ small }) => {
	return (
		<div className='overlay'>
			<div id='loading-bar-spinner' className='spinner'>
				<div className={clsx('spinner_icon', small && 'small')}></div>
			</div>
		</div>
	)
}

export default LoaderFullScreen
