import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
<<<<<<< HEAD
import AlbumItself from './components/Album/AlbumItself'
import AlbumTracks from './components/Album/AlbumTracks'
import Layout from './components/Layout/Layout'
import HomePage from './pages/Home/HomePage'
import UserLogin from './pages/Login/UserLogin'
import SearchPage from './pages/Search/SearchPage'
=======
import Layout from './components/Layout/Layout'
import Album from './pages/Entities/AlbumPage/Album'
import Artist from './pages/Entities/ArtistPage/Artist'
import Playlist from './pages/Entities/PlaylistPage/Playlist'
import Track from './pages/Entities/TrackPage/Track'
import Home from './pages/HomePage/Home'
import Login from './pages/LoginPage/Login'
import MyProfile from './pages/Profile/MyProfile/MyProfile'
import UserProfile from './pages/Profile/UserProfilePage/UserProfile'
import Search from './pages/SearchPage/Search'
>>>>>>> 4f0b9ac (first release)

function App() {
	const [loggedIn, setLoggedIn] = useState(Boolean(Cookies.get('token')))

	const cookieExists = Cookies.get('token')

	useEffect(() => {
		if (cookieExists) {
			setLoggedIn(true)
		}
	}, [cookieExists])

	return (
		<Router>
			<Routes>
				{!loggedIn ? (
<<<<<<< HEAD
					<Route path='/' element={<UserLogin />} />
				) : (
					<Route path='/' element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path='new-releases/:id'>
							<Route index element={<AlbumItself />} />
							<Route path='tracks'>
								<Route index element={<AlbumTracks />} />
							</Route>
						</Route>

						<Route path='/search'>
							<Route index element={<SearchPage />}></Route>
=======
					<Route path='/' element={<Login />} />
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
>>>>>>> 4f0b9ac (first release)
						</Route>
					</Route>
				)}
			</Routes>
		</Router>
	)
}

export default App
