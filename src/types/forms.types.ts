export interface IMainSearchForm {
	searchString: ''
}

export interface IPlaylistForm {
	name: string
	description: string
	toggles: {
		public: boolean
		collaborative: boolean
	}
}
