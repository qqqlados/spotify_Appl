import React from 'react'
import OptionsSkeleton from '../OptionsSkeleton'

const PlaylistOptions = ({ modalOptions, setModalOptions, setModalChangePl, setModalReorderTracks, playlistId, noTracks }) => {
	return (
		<>
			{playlistId && (
				<OptionsSkeleton modalOptions={modalOptions} setModalOptions={setModalOptions}>
					<li
						onClick={() => {
							setModalChangePl(true)
							setModalOptions(false)
						}}
					>
						Change playlist
					</li>
					{!noTracks && (
						<li
							onClick={() => {
								setModalReorderTracks(true)
								setModalOptions(false)
							}}
						>
							Update playlist's items
						</li>
					)}
				</OptionsSkeleton>
			)}
		</>
	)
}

export default PlaylistOptions
