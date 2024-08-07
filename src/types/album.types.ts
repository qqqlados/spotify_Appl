import { IImage } from '../shared/types/image.type'
import { IArtist } from '../types/artist.types'
import { ITrack } from './track.types'

export interface IAlbum {
	id: string
	name: string
	popularity: number
	release_date: string
	artists: IArtist[]
	images: IImage[]
	total_tracks: number
	tracks: {
		items: ITrack[]
	}
}

export interface IAlbumNewReleases {
	albums: {
		items: IAlbum[]
	}
}

export interface IAlbumData extends Omit<IAlbum, 'id'> {}
