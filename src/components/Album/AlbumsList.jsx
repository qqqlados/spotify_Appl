// import { Link } from 'react-router-dom'
// import { useGetNewReleasesQuery } from '../../api/albums'
// import { useAlbumImagesArray } from '../../hooks/useAlbums'
// import styles from './Album.module.scss'

// const AlbumsList = () => {
// 	const { error, isLoading } = useGetNewReleasesQuery()

// 	const { albums, images } = useAlbumImagesArray()

// 	let content
// 	if (isLoading) {
// 		content = <div>Loading...</div>
// 	} else if (error) {
// 		content = error
// 	} else {
// 		content = (
// 			<div className={styles.new_releases_container}>
// 				{albums.map((item, index) => (
// 					<Link key={item.id} to={`/new-releases/${item.id}`}>
// 						<img key={index} src={images[index].url} alt='Something' />
// 					</Link>
// 				))}
// 			</div>
// 		)
// 	}

// 	return <div className={styles.new_releases}>{content}</div>
// }

// export default AlbumsList
