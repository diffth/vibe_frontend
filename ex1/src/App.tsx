import { Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import HomePage from './pages/HomePage'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Public Sans', sans-serif;
    background-color: #ffffff;
    color: #111827;
  }
`

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}
