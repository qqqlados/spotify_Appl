import { IImage } from '../shared/types/image.type'
import { ITrack } from '../types/track.types'

export interface IPlaylist {
	id: string
	name: string
	description: string
	tracks?: {
		items: Array<{ track: ITrack }>
	}
	imageCover?: string
	followers?: {
		total: number
	}
	owner?: {
		id: string
		display_name: string
	}
	images?: IImage[]
	public: boolean
	collaborative?: boolean
}

export interface IPlaylistTracksOrder {
	items: ITrack[]
}
export interface IPlaylistImagesOrder {
	items: IImage[]
}

export interface IPlaylistData extends Pick<IPlaylist, 'id' | 'name' | 'description'> {}

export interface IUpdatePlaylistItems {
	playlistId: string
	tracksOrder: ITrack[] | undefined
}

export interface IPlaylistAddTrack {
	id: string | undefined
	uris: string[]
}

export interface IPlaylistRemoveTrack {
	id: string
	tracks: [{ uri: string }]
	snapshot_id?: string
}

export interface IPlaylistFollow {
	id: string
	public: boolean
}
