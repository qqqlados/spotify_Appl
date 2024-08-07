import { IAlbum } from '../types/album.types'
import { IPlaylist } from '../types/playlist.types'
import { ITrack } from '../types/track.types'

export interface ISearchResults {
	albums: {
		items: IAlbum[]
	}
	tracks: {
		items: ITrack[]
	}
	playlists: {
		items: IPlaylist[]
	}
}
