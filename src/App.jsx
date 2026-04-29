import { useState } from 'react'

import HeroSection from './components/Herosection'
import HomePage from './components/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomePage />
    </>
  )
}

export default App
