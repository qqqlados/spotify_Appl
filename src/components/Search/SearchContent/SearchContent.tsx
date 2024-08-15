import { useGetSearchResultQuery } from '../../../api/searchTab'
import { useAppSelector } from '../../../hooks/redux'
import { useSearchResult } from '../../../hooks/useSearchResult'
import ErrorMessage from '../../../shared/ErrorMessage'
import AlbumsList from '../../Lists/AlbumsList/AlbumsList'
import PlaylistsList from '../../Lists/PlaylistsList/PlaylistsList'
import TrackList from '../../Lists/TrackList/TrackList'
import LoaderCircle from '../../Loader/LoaderCircle'
import { selectSearchTerm, selectUrlFilter } from '../searchSlice'
import styles from './SearchContent.module.scss'

const SearchContent = ({ addTrack }: { addTrack?: boolean }) => {
	const searchPerformed = useAppSelector(state => state.search.searchPerformed)

	const { data, albums, imagesAlbums, trackList, imagesTracks, playlistsList, imagesPlaylists } = useSearchResult()

	const searchTerm = useAppSelector(selectSearchTerm)
	const urlFilter = useAppSelector(selectUrlFilter)
	const { isFetching, isError } = useGetSearchResultQuery(
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
			{isFetching ? (
				<LoaderCircle />
			) : isError ? (
				<ErrorMessage />
			) : data ? (
				<div className={styles.wrapper}>
					{trackList.length > 0 && (
						<div className={styles.tracks}>
							<h1 className={styles.title}>Tracks</h1>
							<TrackList tracks={trackList} images={imagesTracks} addTrack={addTrack} />{' '}
						</div>
					)}

					{albums.length > 0 && (
						<div className={styles.albums}>
							<h1 className={`${styles.title} ${styles.title_albums}`}>Albums</h1>
							<AlbumsList albums={albums} images={imagesAlbums} />
						</div>
					)}

					{playlistsList.length > 0 && (
						<div className={styles.playlists}>
							<h1 className={styles.title}>Playlists</h1>
							<PlaylistsList playlists={playlistsList} images={imagesPlaylists} />
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
