import React from 'react'

const ThreeDotsOptions = ({ setModalOptions }) => {
	return (
		<div onClick={() => setModalOptions(true)}>
			<img src='/public/three-dots-vertical-svgrepo-com.svg' alt='' />
		</div>
	)
}

export default ThreeDotsOptions
