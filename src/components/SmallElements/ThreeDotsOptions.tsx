import React from 'react'

type ThreeDotsOptionsProps = {
	setModalOptions: React.Dispatch<React.SetStateAction<boolean>>
}

const ThreeDotsOptions = ({ setModalOptions }: ThreeDotsOptionsProps) => {
	return (
		<div onClick={() => setModalOptions(true)}>
			<img src='/src/shared/assets/imgs/three-dots-vertical-svgrepo-com.svg' alt='' />
		</div>
	)
}

export default ThreeDotsOptions
