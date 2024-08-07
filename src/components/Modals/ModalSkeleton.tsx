import clsx from 'clsx'
import { motion } from 'framer-motion'
import React from 'react'
import s from './ModalSkeleton.module.scss'

type ModalSkeletonProps = {
	children: React.ReactNode
	modalOpen: React.Dispatch<React.SetStateAction<boolean>>
	title: string
	paddingBottom?: boolean
}

const ModalSkeleton = ({ children, modalOpen, title, paddingBottom }: ModalSkeletonProps) => {
	const closeModals = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		modalOpen(false)
	}

	const overlay = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.1,
			},
		},
	}

	const content = {
		hidden: {
			scale: 0.9,
		},
		visible: {
			scale: 1,
			transition: {
				duration: 0.2,
			},
		},
	}

	return (
		<motion.div className={s.overlay} onClick={e => e.stopPropagation()} variants={overlay} initial='hidden' animate='visible' exit='hidden'>
			<motion.div className={clsx(s.container, paddingBottom && s.pb_large)} variants={content} initial='hidden' animate='visible' exit='hidden'>
				<div className={s.top}>
					<h1 className={s.title}>{title}</h1>
					<button className={s.close_btn} onClick={closeModals}>
						X
					</button>
				</div>
				<div className={s.content}>{children}</div>
			</motion.div>
		</motion.div>
	)
}

export default ModalSkeleton
