import React from 'react'
import ReactDOM from 'react-dom/client'
<<<<<<< HEAD
=======
import { Toaster } from 'react-hot-toast'
>>>>>>> 4f0b9ac (first release)
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { store } from './providers/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
=======
	<Provider store={store}>
		<App />
		<Toaster />
	</Provider>
>>>>>>> 4f0b9ac (first release)
)
