import clsx from 'clsx'
import './style.scss'

type Props = {
	small?: boolean
}

const LoaderFullScreen = ({ small }: Props) => {
	return (
		<div className='overlay'>
			<div id='loading-bar-spinner' className='spinner'>
				<div className={clsx('spinner_icon', small && 'small')}></div>
			</div>
		</div>
	)
}

export default LoaderFullScreen
