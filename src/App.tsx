import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Layout from './components/Layout/Layout'

import Album from './pages/Entities/AlbumPage/Album'
import Artist from './pages/Entities/ArtistPage/Artist'
import Playlist from './pages/Entities/PlaylistPage/Playlist'
import Track from './pages/Entities/TrackPage/Track'
import Home from './pages/HomePage/Home'
import Login from './pages/LoginPage/Login'
import MyProfile from './pages/ProfilePage/MyProfile/MyProfile'
import UserProfile from './pages/ProfilePage/UserProfilePage/UserProfile'
import Search from './pages/SearchPage/Search'

function App() {
	const [loggedIn, setLoggedIn] = useState(Boolean(Cookies.get('token')))

	const cookieExists = Cookies.get('token')

	useEffect(() => {
		if (cookieExists) {
			setLoggedIn(true)
		} else setLoggedIn(false)
	}, [cookieExists])

	return (
		<Router>
			<Routes>
				{!loggedIn ? (
					<Route path='*' element={<Login />} />
				) : (
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />
						<Route path='new-releases/:id'>
							<Route index element={<Album />} />
						</Route>

						<Route path='search/'>
							<Route index element={<Search />} />
						</Route>

						<Route path='album/:album_id'>
							<Route index element={<Album />} />
						</Route>
						<Route path='track/:track_id'>
							<Route index element={<Track />} />
						</Route>
						<Route path='playlist/:playlist_id' element={<Playlist />} />
						<Route path='artist/:artist_id'>
							<Route index element={<Artist />} />
						</Route>

						<Route path='my-profile/'>
							<Route index element={<MyProfile />} />
						</Route>
						<Route path='user/:user_id'>
							<Route index element={<UserProfile />} />
						</Route>
					</Route>
				)}
			</Routes>
		</Router>
	)
}

export default App
