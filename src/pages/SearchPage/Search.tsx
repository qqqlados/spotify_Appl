import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { TbMusicSearch } from 'react-icons/tb'
import { useGetSearchResultQuery } from '../../api/searchTab'
import SearchContent from '../../components/Search/SearchContent/SearchContent'
import SearchSkeleton from '../../components/Search/SearchForm/SearchSkeleton'
import { selectSearchTerm, selectUrlFilter } from '../../components/Search/searchSlice'
import { useAppSelector } from '../../hooks/redux'
import styles from './Search.module.scss'

const Search = () => {
	const searchTerm = useAppSelector(selectSearchTerm)
	const urlFilter = useAppSelector(selectUrlFilter)
	const searchPerformed = useAppSelector(state => state.search.searchPerformed)

	const { data, isLoading } = useGetSearchResultQuery(
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
			<motion.div className={styles.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
				<div className={styles.inner__container}>
					<div className={styles.top}>
						<h1 className={clsx(styles.title, data && styles.invisible)}>Make your search!</h1>
						<SearchSkeleton data={data} />
					</div>

					<main className={styles.main}>
						{!data && !isLoading && (
							<div className={styles.icon_poster}>
								<TbMusicSearch />
							</div>
						)}

						<SearchContent />
					</main>
				</div>
			</motion.div>
			<Toaster />
		</>
	)
}

export default Search
