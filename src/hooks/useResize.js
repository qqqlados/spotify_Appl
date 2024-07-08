import { useEffect, useRef, useState } from 'react'

export const useResizeSidebar = (minWidth, maxWidth, defaultWidth) => {
	const [width, setWidth] = useState(defaultWidth)
	const isResizing = useRef(false)

	const body = document.querySelector('body')

	useEffect(() => {
		const handleMouseMove = e => {
			if (!isResizing.current) {
				return
			}

			body.style.cursor = 'grab'

			if (e.screenX <= 90) {
				setWidth(minWidth)
			} else if (e.screenX > 200 && e.screenX <= defaultWidth) {
				setWidth(defaultWidth)
			} else if (e.screenX > defaultWidth && e.screenX <= maxWidth) {
				setWidth(previousWidth => previousWidth + e.movementX)
			}
		}

		const handleMouseUp = () => {
			body.style.cursor = 'default'
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

export const useResizeHeader = container => {
	const [scrolled, setScrolled] = useState(false)

	const handleScroll = e => {
		const { scrollTop } = e.target
		if (scrollTop > 160) {
			setScrolled(true)
		} else if (scrollTop < 160) {
			setScrolled(false)
		}
	}

	return { scrolled, handleScroll }
}
