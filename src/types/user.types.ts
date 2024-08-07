import { IImage } from '../shared/types/image.type'

export interface IUser {
	id: string
	display_name: string
	country: string
	followers: {
		total: number
	}
	images: IImage[]
}

export interface IUserTopItems<T> {
	items: T[]
}
