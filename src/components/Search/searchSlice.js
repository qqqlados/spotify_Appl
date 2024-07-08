import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	searchTerm: '',
	userSearchTerm: '',
	addTrackSearchTerm: '',
	filters: {
		track: true,
		album: false,
		playlist: false,
	},
	urlFilters: [],
	searchPerformed: false,
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		toggleFilters: (state, action) => {
			if (state.searchPerformed) {
				const newFilter = { ...state.filters }

				newFilter[action.payload] = !state.filters[action.payload]

				if (Object.values(newFilter).some(value => value == true)) {
					state.filters = newFilter
				}
			}
		},
		filtersIntoUrl: state => {
			const filter_keys = Object.keys(state.filters).filter(item => state.filters[item] == true)

			if (filter_keys.length >= 1) {
				if (filter_keys.length > 1) {
					const filter_final = filter_keys.map(item => item).join('%2C')
					state.urlFilters = filter_final
				} else {
					state.urlFilters = filter_keys
				}
			}
		},
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload
		},
		setUserSearchTerm: (state, action) => {
			state.userSearchTerm = action.payload
		},
		setAddTrackSearchTerm: (state, action) => {
			state.addTrackSearchTerm = action.payload
		},
		setFilters: state => {
			state.searchPerformed = true
		},
		disableFilters: state => {
			state.searchPerformed = false
		},
	},
})

export const selectSearchTerm = state => state.search.searchTerm
export const selectUserSearchTerm = state => state.search.userSearchTerm
export const selectFilter = state => state.search.filters
export const selectUrlFilter = state => state.search.urlFilters
export const selectFiltersState = state => state.search.filters

export const {
	toggleFilters,
	filtersIntoUrl,
	setSearchTerm,
	setUserSearchTerm,
	setAddTrackSearchTerm,
	setFilters,
	disableFilters,
} = searchSlice.actions

export default searchSlice.reducer
