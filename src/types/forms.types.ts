import { FormEvent } from 'react'
import { z } from 'zod'

export interface IMainSearchForm {
	searchString: ''
	submitEvent: FormEvent<KeyboardEvent>
}

export const userSearchSchema = z.object({
	username: z.string().min(4, 'Your search query must contain at least 4 characters').max(30, 'Your search query cannot exceed 40 characters'),
})

export type IUserSearchForm = z.infer<typeof userSearchSchema>

export const searchSchema = z.object({
	query: z.string().min(4, 'Your search query must contain at least 4 characters').max(20, 'Your search query cannot exceed 40 characters'),
})

export type ISearchForm = z.infer<typeof searchSchema>

const playlistTogglesSchema = z.object({
	public: z.boolean(),
	collaborative: z.boolean(),
})

export const playlistFormSchema = z.object({
	name: z
		.string()
		.min(5, "Playlist's name is too short")
		.max(30, "Playlist's name exceeds permissible word length")
		.regex(
			/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9.,':—\-! ]*$/,
			"Playlist's name field has invalid characters. You can use only letters, numbers or some other characters"
		),
	description: z
		.string()
		.min(10, "Playlist's description cannot be shorter than 20 characters")
		.max(120, "Playlist's description cannot exceed 120 characters")
		.regex(
			/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9.,'!:—\- ]*$/,
			"Playlist's description field has invalid characters. You can use only letters, numbers or some other symbols"
		)
		.optional()
		.or(z.literal('')),
	toggles: playlistTogglesSchema,
})

export type IPlaylistToggles = z.infer<typeof playlistTogglesSchema>

export type IPlaylistForm = z.infer<typeof playlistFormSchema>
