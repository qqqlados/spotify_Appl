import { useEffect, useRef, useState } from 'react'

type ResizeElementType = {
	minWidth: number
	maxWidth: number
	defaultWidth: number
}

export const useResizeSidebar = ({ minWidth, maxWidth, defaultWidth }: ResizeElementType) => {
	const [width, setWidth] = useState(defaultWidth)
	const isResizing = useRef(false)

	const body = document.querySelector('body')

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isResizing.current) {
				return
			}

			if (body) body.style.cursor = 'grab'

			if (e.screenX <= 90) {
				setWidth(minWidth)
			} else if (e.screenX > 200 && e.screenX <= defaultWidth) {
				setWidth(defaultWidth)
			} else if (e.screenX > defaultWidth && e.screenX <= maxWidth) {
				setWidth(previousWidth => previousWidth + e.movementX)
			}
		}

		const handleMouseUp = () => {
			if (body) body.style.cursor = 'default'
			isResizing.current = false
		}

		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
		}
	}, [minWidth, maxWidth, defaultWidth])

	const onMouseDown = () => {
		isResizing.current = true
	}

	return { width, onMouseDown }
}

export const useResizeHeader = () => {
	const [scrolled, setScrolled] = useState(false)

	const handleScroll = (e: React.UIEvent<HTMLElement>) => {
		const { scrollTop } = e.target as HTMLElement
		if (scrollTop > 160) {
			setScrolled(true)
		} else if (scrollTop < 160) {
			setScrolled(false)
		}
	}

	return { scrolled, handleScroll }
}
