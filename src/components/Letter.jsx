import { useContext, useEffect } from 'react'
import { AppContext } from '../App'

function Letter({ letterPos, attemptVal }) {
	const { board, correctWord, currAttempt, setDisabledLetters } =
		useContext(AppContext)
	const letter = board[attemptVal][letterPos]

	const correct = correctWord[letterPos] === letter // if the letter is equal to currentLetterPos of the correct word
	const almost = !correct && letter !== '' && correctWord.includes(letter) // check if the letter is inside correctWord array
	const letterState =
		currAttempt.attempt > attemptVal &&
		(correct ? 'correct' : almost ? 'almost' : 'error') //if elseif else

	useEffect(() => {
		if (letter !== '' && !correct && !almost) {
			setDisabledLetters((prev) => [...prev, letter])
		}
	}, [currAttempt.attempt]) // run the check if an attempt has been made

	return <div className={`letter ${letterState}`}>{letter}</div>
}
export default Letter
