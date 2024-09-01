import { useGetSearchResultQuery, useGetSearchTracksQuery } from '../api/searchTab'
import { selectSearchTerm, selectUrlFilter } from '../components/Search/searchSlice'
import { useAppSelector } from './redux'

export const useSearchResult = () => {
	const searchTerm = useAppSelector(selectSearchTerm)
	const urlFilter = useAppSelector(selectUrlFilter)
	const searchPerformed = useAppSelector(state => state.search.searchPerformed)

	const { data, albums, trackList, imagesTracks, playlistsList } = useGetSearchResultQuery(
		{
			searchTerm,
			urlFilter,
		},
		{
			skip: searchPerformed == false,
			selectFromResult: ({ data }) => ({
				data: data,
				albums: data?.albums?.items || [],
				trackList: data?.tracks?.items || [],
				imagesTracks: [...(data?.tracks?.items || [])]
					.map(track => track.album)
					.map(el => el.images)
					.flatMap(item => item)
					.filter(el => el.height == 300),
				playlistsList: data?.playlists?.items || [],
			}),
		}
	)

	return {
		data,
		albums,
		trackList,
		imagesTracks,
		playlistsList,
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
