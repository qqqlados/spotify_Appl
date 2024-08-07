import ReactDOM from 'react-dom/client'

import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { store } from './providers/store.js'

const rootElement = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(rootElement).render(
	<Provider store={store}>
		<App />
		<Toaster />
	</Provider>
)
