import { useState } from 'react'
import { clsx } from 'clsx'
import './App.css'
import languages from './languages.js'
import Confetti from 'react-confetti'
import { words } from './words.js'

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = languages.length - wrongGuessCount <= 1
  const isGameOver = isGameWon || isGameLost
  const lastGuessLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessLetter && !currentWord.includes(lastGuessLetter)

  // Static values
  const alphabets = "qwertyuiopasdfghjklzxcvbnm"

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;

    const spanStyles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    };

    const className = clsx({
      langTag: true,
      lost: isLanguageLost
    })

    return (
      <span key={lang.name} style={spanStyles} className={className}>{lang.name}</span>
    )
  })

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx("letter", isGameLost && !guessedLetters.includes(letter) && "missed-letter")

    return (
      <span key={index} className={letterClassName}>{shouldRevealLetter ? letter.toUpperCase() : ""}</span>
    )
  });

  const keyboardElements = alphabets.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
      keyboardButtons: true
    })

    return (
      <button disabled={isGameOver} key={letter} className={className} onClick={() => handleLetterClick(letter)}>
        {letter.toUpperCase()}
      </button>
    )
  })

  function handleLetterClick(letter) {
    setGuessedLetters(prevLetters => {
      return prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    })
  }

  const gameStatusClass = clsx({
    gameStatus: true,
    won: isGameWon,
    lost: isGameLost,
    farewellMessage: !isGameOver && isLastGuessIncorrect
  })

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <>
          <p className="farewell-message">{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
        </>
      )
    }

    if (isGameWon) {
      return (
        <>
          <h3 className="main-message">You won!</h3>
          <p className="sub-message">Well done! 🎉</p>
        </>
      )
    }

    if (isGameLost) {
      return (
        <>
          <h3 className="main-message">Game over!</h3>
          <p className="sub-message">You lose! Better start learning Assembly 😭</p>
        </>
      )
    }
  }

  function getFarewellText(language) {
    const options = [
      `Farewell, ${language}`,
      `Adios, ${language}`,
      `R.I.P., ${language}`,
      `We'll miss you, ${language}`,
      `Oh no, not ${language}!`,
      `${language} bites the dust`,
      `Gone but not forgotten, ${language}`,
      `The end of ${language} as we know it`,
      `Off into the sunset, ${language}`,
      `${language}, it's been real`,
      `${language}, your watch has ended`,
      `${language} has left the building`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  function getRandomWord() {
    const randIdx = Math.floor(Math.random() * words.length)
    return words[randIdx]
  }

  function handleNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  return (
    <>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <main>
        <header>
          <div className="heading">
            <h1>Assembly Endgame </h1>
            <a target="_blank" href="https://github.com/harshilshrma/assembly-endgame" className="github-link">GitHub</a>
          </div>
          <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </header>

        <section className={gameStatusClass}>
          {renderGameStatus()}
        </section >

        <section className="languages-list">
          {languageElements}
        </section>

        <section className="word">
          {letterElements}
        </section>

        <section className="keyboard">
          {keyboardElements}
        </section>

        {isGameOver && <button onClick={handleNewGame} className="new-game">New Game</button>}
      </main >
    </>
  )
}

export default App
