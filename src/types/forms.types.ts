import { FormEvent } from 'react'
import { z } from 'zod'

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

export const userSearchSchema = z.object({
	username: z.string().min(4, 'Your search query must contain at least 4 characters').max(30, 'Your search query cannot exceed 40 characters'),
})

export type IUserSearchForm = z.infer<typeof userSearchSchema>

export const searchSchema = z.object({
	query: z.string().min(3, 'Your search query must contain at least 4 characters').max(20, 'Your search query cannot exceed 40 characters'),
})

export type ISearchForm = z.infer<typeof searchSchema>
