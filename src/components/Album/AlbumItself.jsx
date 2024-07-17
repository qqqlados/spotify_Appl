// import React from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { useGetAlbumQuery } from '../../api/albums'
// import styles from './Album.module.scss'

// const AlbumItself = () => {
// 	const { id } = useParams()
// 	const { data, isLoading, error } = useGetAlbumQuery(id)

// 	console.log(data)

// 	const image = data?.images.filter(item => item.height === 640)
// 	const genres = data?.genres
// 	let content
// 	if (isLoading) {
// 		content = <div>Loading...</div>
// 	} else if (error) {
// 		content = <p>Album is not found!</p>
// 	} else {
// 		content = (
// 			<div className={styles.ai}>
// 				<div className={styles.ai_image}>
// 					{image.map(img => (
// 						<img src={img.url} alt='Album image' />
// 					))}
// 				</div>

// 				<div className={styles.ai_content}>
// 					<h1 className={styles.ai_name}>{data?.name}</h1>
// 					<div className={styles.ai_artists}>
// 						{data.artists.map((artist, index) => (
// 							<span key={index}>
// 								{artist.name}
// 								{index == data.artists.length - 1 ? '' : ','}
// 							</span>
// 						))}
// 					</div>

// 					<span className={styles.ai_release_date}>{data?.release_date}</span>
// 					{/* <div className={styles.ai_genres}>
// 						{genres
// 							? genres?.map((genre, index) => <p key={index}>{genre.name}</p>)
// 							: ''}
// 					</div> */}

// 					<p className={styles.ai_popularity}>Popularity: {data?.popularity}</p>
// 				</div>
// 				<Link to={`/new-releases/${id}/tracks`} className={styles.ai_button}>
// 					See Tracks
// 				</Link>
// 			</div>
// 		)
// 	}

// 	return <div className={styles.ai_container}>{content}</div>
// }

// export default AlbumItself
