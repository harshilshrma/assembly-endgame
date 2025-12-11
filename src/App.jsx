import './App.css'
import languages from './languages.js'

function App() {

  const languageElements = languages.map(lang => {
    const spanStyles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    };

    return (
      <span key={lang.name} style={spanStyles} className="lang-tag">{lang.name}</span>
    )
  })

  return (
    <main>
      <header>
        <h1>Assembly Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className="game-status">
        <h3>Game over!</h3>
        <p>You lose! Better start learning Assembly 😭</p>
      </section>

      <section className="languages-list">
        {languageElements}
      </section>
    </main>
  )
}

export default App
