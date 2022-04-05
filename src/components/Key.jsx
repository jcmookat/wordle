import { useContext } from 'react'
import { AppContext } from '../App'

function Key({ keyVal, bigKey, disabled }) {
	const { gameOver, onDelete, onEnter, onSelectLetter } = useContext(AppContext)
	const selectLetter = () => {
		if (gameOver.gameOver) return
		if (keyVal === 'ENTER') {
			onEnter()
		} else if (keyVal === 'DELETE') {
			onDelete()
		} else {
			onSelectLetter(keyVal)
		}
	}
	return (
		<div
			className={`key${bigKey ? ' big' : ''}${disabled ? ' disabled' : ''}`}
			onClick={selectLetter}>
			{keyVal}
		</div>
	)
}
export default Key
