import { useEffect } from 'react'

export const useModal = modalIsOpen => {
	useEffect(() => {
		const body = document.querySelector('body')
		if (body) {
			if (modalIsOpen) {
				body.style.overflow = 'hidden'
			} else {
				body.style.overflow = ''
			}
		}
	}, [modalIsOpen])
}

export const useOptionsModal = (modalRef, modalIsOpen, closeModal) => {
	useEffect(() => {
		if (modalIsOpen && modalRef) {
			modalRef.current.addEventListener('mouseleave', closeModal)
		} else {
			return () => modalRef.current.removeEventListener('mouseleave', closeModal())
		}
	}, [modalIsOpen])

	return null
}
