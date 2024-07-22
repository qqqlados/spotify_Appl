import React from 'react'
import ReactDOM from 'react-dom/client'

import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { store } from './providers/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
		<Toaster />
	</Provider>
)
