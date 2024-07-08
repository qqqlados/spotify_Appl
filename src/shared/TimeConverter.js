export const timeConverter = () => {
	function formatTime(millis) {
		let totalSeconds = Math.floor(millis / 1000)
		let hours = Math.floor(totalSeconds / 3600)
		let minutes = Math.floor(totalSeconds / 60)
		let seconds = totalSeconds % 60

		minutes = minutes < 10 ? '0' + minutes : minutes
		seconds = seconds < 10 ? '0' + seconds : seconds

		return `${hours}:${minutes}:${seconds}`
	}

	return { formatTime }
}
