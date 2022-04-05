import './App.css'
import { createContext, useState, useEffect } from 'react'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { boardDefault, generateWordSet } from './Words'

export const AppContext = createContext()

function App() {
	const [board, setBoard] = useState(boardDefault)
	const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 })
	const [wordSet, setWordSet] = useState(new Set())
	const [disabledLetters, setDisabledLetters] = useState([])
	const [gameOver, setGameOver] = useState({
		gameOver: false,
		guessedWord: false,
	})
	const correctWord = 'RIGHT'

	useEffect(() => {
		generateWordSet().then((words) => {
			// .then because generateWordSet is an async function and returns a promise
			setWordSet(words.wordSet) // .wordset because we are returning as object { wordSet }
		})
	}, [])

	const onSelectLetter = (keyVal) => {
		if (currAttempt.letterPos > 4) return // if letterPos is greater than 4, it will end the function
		const newBoard = [...board]
		newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
		setBoard(newBoard)
		setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
		// { attempt: 0, letterPos: 0 } 0 + 1
	}
	const onEnter = () => {
		if (currAttempt.letterPos !== 5) return
		let currWord = ''
		for (let i = 0; i < 5; i++) {
			currWord += board[currAttempt.attempt][i]
		}

		if (wordSet.has(currWord.toLowerCase())) {
			// .has fxn in JS for sets
			setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 }) //next row first position
		} else {
			alert('Not A Word')
		}

		if (currWord === correctWord) {
			alert('Game Ended')
		}
	}
	const onDelete = () => {
		if (currAttempt.letterPos === 0) return
		const newBoard = [...board]
		newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ''
		setBoard(newBoard)
		setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
	}
	return (
		<div className='App'>
			<nav>
				<h1>Wordle</h1>
			</nav>
			<AppContext.Provider
				value={{
					board,
					setBoard,
					currAttempt,
					setCurrAttempt,
					onSelectLetter,
					onEnter,
					onDelete,
					correctWord,
					setDisabledLetters,
					disabledLetters,
					gameOver,
					setGameOver,
				}}>
				<div className='game'>
					<Board />
					<Keyboard />
				</div>
			</AppContext.Provider>
		</div>
	)
}

export default App
