import { useGetSearchResultQuery, useGetSearchTracksQuery } from '../api/searchTab'
import { selectSearchTerm, selectUrlFilter } from '../components/Search/searchSlice'
import { useAppSelector } from './redux'

export const useSearchResult = () => {
	const searchTerm = useAppSelector(selectSearchTerm)
	const urlFilter = useAppSelector(selectUrlFilter)
	const searchPerformed = useAppSelector(state => state.search.searchPerformed)

	const { data, albums, trackList, playlistsList } = useGetSearchResultQuery(
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
				playlistsList: data?.playlists?.items || [],
			}),
		}
	)
	// prettier-ignore
	return { data, albums, trackList, playlistsList	}
}

export const useSearchTracks = (search: string) => {
	const { trackList } = useGetSearchTracksQuery(search, {
		selectFromResult: ({ data }) => ({
			trackList: data?.tracks?.items || [],
		}),
	})
	return { trackList }
}
