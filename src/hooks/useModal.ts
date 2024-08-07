import React, { useEffect } from 'react'

type OptionsModalType = {
	modalRef: React.RefObject<HTMLDivElement>
	modalIsOpen: boolean | undefined
	closeModal: () => void
}

export const useModal = (modalIsOpen: boolean) => {
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

export const useOptionsModal = ({ modalRef, modalIsOpen, closeModal }: OptionsModalType) => {
	useEffect(() => {
		if (modalRef.current) {
			modalRef.current.addEventListener('mouseleave', closeModal)
		} else {
			return () => {
				if (modalRef.current) {
					modalRef.current.removeEventListener('mouseleave', closeModal)
				}
			}
		}
	}, [modalIsOpen])

	return null
}
