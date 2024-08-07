import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import { useModal, useOptionsModal } from '../../../hooks/useModal'
import s from './OptionsSkeleton.module.scss'

type OptionsSkeletonProps = {
	modalOptions: boolean | undefined
	setModalOptions: React.Dispatch<React.SetStateAction<boolean>>
	children: React.ReactNode
}

const OptionsSkeleton = ({ modalOptions, setModalOptions, children }: OptionsSkeletonProps) => {
	const modalRef = useRef<HTMLDivElement>(null)

	const closeModal = () => {
		setModalOptions(false)
	}

	if (modalOptions) useModal(modalOptions)

	useOptionsModal({ modalRef, modalIsOpen: modalOptions, closeModal })

	return (
		<motion.div
			className={s.body}
			ref={modalRef}
			initial={{ opacity: 0, scale: 0.7 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.7 }}
			transition={{ duration: 0.3 }}
		>
			<ul className={s.options_list}>{children}</ul>
		</motion.div>
	)
}

export default OptionsSkeleton
