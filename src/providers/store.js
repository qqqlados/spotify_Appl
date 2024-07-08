import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from '../api/apiSlice'
<<<<<<< HEAD

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
=======
import searchReducer from '../components/Search/searchSlice'

export const store = configureStore({
	reducer: {
		search: searchReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
>>>>>>> 4f0b9ac (first release)
})

setupListeners(store.dispatch)
