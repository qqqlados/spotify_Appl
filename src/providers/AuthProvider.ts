import Cookies from 'js-cookie'

type TokenType = {
	access_token?: string
	[key: string]: string | undefined
}

export const getTokenFromUrl = (): TokenType => {
	return window.location.hash
		.substring(1)
		.split('&')
		.reduce((initial: TokenType, item) => {
			let parts = item.split('=')
			initial[parts[0]] = decodeURIComponent(parts[1])
			return initial
		}, {})
}

export const setCookies = () => {
	const spotifyToken = getTokenFromUrl().access_token

	const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000)

	if (spotifyToken) {
		window.location.hash = ''
		window.location.href = window.location.href.split('#')[0]
		Cookies.set('token', spotifyToken, {
			expires: oneHourFromNow,
			secure: true,
			sameSite: 'Strict',
		})
	}
}

export const getCookies = () => {
	console.log(Cookies.get('token'))
}
