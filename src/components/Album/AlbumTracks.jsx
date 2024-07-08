import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetAlbumTracksQuery } from '../../api/albums'
import styles from './Album.module.scss'

const AlbumTracks = () => {
	const { id } = useParams()
	const { data, isLoading, error } = useGetAlbumTracksQuery(id)

	const tracks = data?.items

	console.log(data?.items)

	let content
	if (isLoading) {
		content = <div>Loading...</div>
	} else if (error) {
		content = error
	} else {
		content = tracks?.map(track => (
			<li className={styles.track}>
				<span className={styles.track_order}>{track.track_number}</span>
				<div className={styles.track_content}>
					<p className={styles.track_name}>{track.name}</p>
					<div className={styles.track_duration}>
						{Math.ceil(track.duration_ms / 1000 / 60)} minutes
					</div>
				</div>
			</li>
		))
	}

	return (
		<div className={styles.track_container}>
			<h1 className={styles.track_heading}>Album tracks: </h1>
			<ul className={styles.track_list}>{content}</ul>
		</div>
	)
}

export default AlbumTracks
