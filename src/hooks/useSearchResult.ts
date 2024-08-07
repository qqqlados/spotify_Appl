import { useGetSearchResultQuery, useGetSearchTracksQuery } from '../api/searchTab'
import { selectSearchTerm, selectUrlFilter } from '../components/Search/searchSlice'
import { useAppSelector } from './redux'

export const useSearchResult = () => {
	const searchTerm = useAppSelector(selectSearchTerm)
	const urlFilter = useAppSelector(selectUrlFilter)
	const searchPerformed = useAppSelector(state => state.search.searchPerformed)

	const { data, albums, imagesAlbums, trackList, imagesTracks, playlistsList, imagesPlaylists } = useGetSearchResultQuery(
		{
			searchTerm,
			urlFilter,
		},
		{
			skip: searchPerformed == false,
			selectFromResult: ({ data }) => ({
				data: data,
				albums: data?.albums?.items || [],
				imagesAlbums: [...(data?.albums?.items || [])]
					.map(el => el.images)
					.map(el => {
						return el.filter(img => img.height == 300 || img.height == null)
					})
					.map(imgArr => imgArr[0]),
				trackList: data?.tracks?.items || [],
				imagesTracks: [...(data?.tracks?.items || [])]
					.map(track => track.album)
					.map(el => el.images)
					.flatMap(item => item)
					.filter(el => el.height == 300),
				playlistsList: data?.playlists?.items || [],
				imagesPlaylists: [...(data?.playlists?.items || [])]
					.map(el => el.images)
					.map(el => {
						return el?.filter(img => img.width == 300 || img.width == null)
					})
					.map(imgArr => imgArr[0]),
			}),
		}
	)

	return {
		data,
		albums,
		imagesAlbums,
		trackList,
		imagesTracks,
		playlistsList,
		imagesPlaylists,
	}
}

export const useSearchTracks = (search: string) => {
	const { trackList, imagesTracks } = useGetSearchTracksQuery(search, {
		selectFromResult: ({ data }) => ({
			trackList: data?.tracks?.items || [],
			imagesTracks: [...(data?.tracks?.items || [])]
				.map(track => track.album)
				.map(el => el.images)
				.flatMap(item => item)
				.filter(el => el.height == 300),
		}),
	})
	return { trackList, imagesTracks }
}
