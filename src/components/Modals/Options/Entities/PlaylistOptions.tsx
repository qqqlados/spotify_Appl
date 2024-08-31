import OptionsSkeleton from '../OptionsSkeleton.js'
import { usePlaylistTracks } from '../../../../hooks/usePlaylists.js'

type PlaylistOptionsProps = {
	modalOptions: boolean | undefined
	setModalOptions: React.Dispatch<React.SetStateAction<boolean>>
	setModalChangePl?: React.Dispatch<React.SetStateAction<boolean>>
	setModalReorderTracks?: React.Dispatch<React.SetStateAction<boolean>>
	playlistId: string
}

const PlaylistOptions = ({ modalOptions, setModalOptions, setModalChangePl, setModalReorderTracks, playlistId }: PlaylistOptionsProps) => {
	const { tracks } = usePlaylistTracks(playlistId!)

	console.log(tracks)

	return (
		<>
			{playlistId && (
				<OptionsSkeleton modalOptions={modalOptions} setModalOptions={setModalOptions}>
					{setModalChangePl && (
						<li
							onClick={() => {
								setModalChangePl(true)
								setModalOptions(false)
							}}
						>
							Change playlist
						</li>
					)}
					{setModalReorderTracks && tracks.length > 2 && (
						<li
							onClick={() => {
								setModalReorderTracks(true)
								setModalOptions(false)
							}}
						>
							Reorder playlist tracks
						</li>
					)}
				</OptionsSkeleton>
			)}
		</>
	)
}

export default PlaylistOptions
