import Cookies from 'js-cookie'

export const getTokenFromUrl = () => {
	return window.location.hash
		.substring(1)
		.split('&')
		.reduce((initial, item) => {
			let parts = item.split('=')
			initial[parts[0]] = decodeURIComponent(parts[1])
			return initial
		}, {})
}

export const setCookies = () => {
	const spotifyToken = getTokenFromUrl().access_token

	if (spotifyToken) {
		window.location.hash = ''
		window.location.href = window.location.href.split('#')[0]
		Cookies.set('token', spotifyToken, {
			expires: new Date().getTime() + 1500000,
			secure: true,
			sameSite: 'Strict',
		})
	}
}

export const getCookies = () => {
	console.log(Cookies.get('token'))
}
