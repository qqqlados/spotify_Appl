import { DropResult } from 'react-beautiful-dnd'
import { IImage } from '../shared/types/image.type'
import { IArtist } from '../types/artist.types'

export interface ITrack {
	id: string
	name: string
	album: {
		id: string
		name: string
		images: IImage[]
		release_date: string
	}
	artists: IArtist[]
	duration_ms: number
	uri: string
}

export interface ITrackSort<T> {
	result: DropResult
	order: T[]
	updateOrder: (items: T[]) => void
}
