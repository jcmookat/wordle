import './App.css'
import { createContext, useState, useEffect } from 'react'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import GameOver from './components/GameOver'
import { boardDefault, generateWordSet } from './Words'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
	const [correctWord, setCorrectWord] = useState('')

	useEffect(() => {
		generateWordSet().then((words) => {
			// .then because generateWordSet is an async function and returns a promise
			setWordSet(words.wordSet) // .wordset because we are returning as object { wordSet }
			setCorrectWord(words.todaysWord.toUpperCase()) // today's Word
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
			toast.error('Not A Word')
		}

		if (currWord === correctWord) {
			setGameOver({
				gameOver: true,
				guessedWord: true,
			})
			return
		}

		if (currAttempt.attempt === 5) {
			setGameOver({
				gameOver: true,
				guessedWord: false,
			})
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
					{gameOver.gameOver ? <GameOver /> : <Keyboard />}
				</div>
			</AppContext.Provider>
			<ToastContainer />
		</div>
	)
}

export default App
