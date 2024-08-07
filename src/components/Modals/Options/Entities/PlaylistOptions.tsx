import OptionsSkeleton from '../OptionsSkeleton.js'

type PlaylistOptionsProps = {
	modalOptions: boolean | undefined
	setModalOptions: React.Dispatch<React.SetStateAction<boolean>>
	setModalChangePl?: React.Dispatch<React.SetStateAction<boolean>>
	setModalReorderTracks?: React.Dispatch<React.SetStateAction<boolean>>
	playlistId: string
}

const PlaylistOptions = ({ modalOptions, setModalOptions, setModalChangePl, setModalReorderTracks, playlistId }: PlaylistOptionsProps) => {
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
					{setModalReorderTracks && (
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
