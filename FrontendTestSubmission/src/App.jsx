import { useState } from 'react'
import UrlShortenerForm from './components/UrlShortenerForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UrlShortenerForm />
    </>
  )
}

export default App
