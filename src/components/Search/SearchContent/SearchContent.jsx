import React from 'react'
import { useSelector } from 'react-redux'
import { useGetSearchResultQuery } from '../../../api/searchTab'
import { useSearchResult } from '../../../hooks/useSearchResult'
import AlbumsList from '../../Lists/AlbumsList/AlbumsList'
import PlaylistsList from '../../Lists/PlaylistsList/PlaylistsList'
import TrackList from '../../Lists/TrackList//TrackList'
import LoaderFullScreen from '../../Loader/LoaderFullScreen'
import { selectSearchTerm, selectUrlFilter } from '../searchSlice'
import styles from './SearchContent.module.scss'
import ErrorMessage from '/src/shared/ErrorMessage'

const SearchContent = ({ addTrack }) => {
	const searchPerformed = useSelector(state => state.search.searchPerformed)

	const { data, albums, imagesAlbums, trackList, imagesTracks, playlistsList, imagesPlaylists } = useSearchResult(searchPerformed)

	const searchTerm = useSelector(selectSearchTerm)
	const urlFilter = useSelector(selectUrlFilter)
	const { isLoading, isError } = useGetSearchResultQuery(
		{
			searchTerm,
			urlFilter,
		},
		{
			skip: !searchPerformed,
		}
	)

	return (
		<>
			{isLoading ? (
				<LoaderFullScreen />
			) : isError ? (
				<ErrorMessage />
			) : data ? (
				<div className={styles.container}>
					{trackList.length > 0 && (
						<div className={styles.tracks}>
							<h1 className={styles.title}>Tracks</h1>
							<TrackList tracks={trackList} images={imagesTracks} addTrack={addTrack} />{' '}
						</div>
					)}

					{albums.length > 0 && (
						<div className={styles.albums}>
							<h1 className={styles.title}>Albums</h1>
							<AlbumsList albums={albums} images={imagesAlbums} link={`/album`} />
						</div>
					)}

					{playlistsList.length > 0 && (
						<div className={styles.playlists}>
							<h1 className={styles.title}>Playlists</h1>
							<PlaylistsList playlists={playlistsList} images={imagesPlaylists} link={`/playlist`} />
						</div>
					)}
				</div>
			) : (
				''
			)}
		</>
	)
}

export default SearchContent
