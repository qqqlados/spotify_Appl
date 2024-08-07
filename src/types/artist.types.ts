import { IImage } from '../shared/types/image.type'

export interface IArtist {
	id: string
	name: string
	followers: {
		total: number
	}
	genres: string[]
	images: IImage[]
}

export interface IArtistData extends Omit<IArtist, 'id'> {}

export interface IArtistFollow {
	id: string
	ids: string[]
}
