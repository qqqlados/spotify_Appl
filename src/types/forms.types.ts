import { FormEvent } from 'react'

export interface IMainSearchForm {
	searchString: ''
	submitEvent: FormEvent<KeyboardEvent>
}

export interface IPlaylistForm {
	name: string
	description: string
	toggles: {
		public: boolean
		collaborative: boolean
	}
}

export interface IUserSearchForm {
	username: string
	submitEvent: FormEvent<KeyboardEvent>
}
