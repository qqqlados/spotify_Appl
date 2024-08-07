export const timeConverter = () => {
	function formatTime(millis: number) {
		let totalSeconds = Math.floor(millis / 1000)
		let hours = Math.floor(totalSeconds / 3600)
		let minutesNum = Math.floor(totalSeconds / 60)
		let secondsNum = totalSeconds % 60

		const minutes = minutesNum < 10 ? '0' + minutesNum : minutesNum
		const seconds = secondsNum < 10 ? '0' + secondsNum : secondsNum

		return `${hours}:${minutes}:${seconds}`
	}

	return { formatTime }
}
