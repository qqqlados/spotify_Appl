import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const spotifyToken = Cookies.get('token')

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.spotify.com/v1',
		headers: {
			Authorization: `Bearer ${spotifyToken}`,
		},
	}),
	endpoints: () => ({}),
})
