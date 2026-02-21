import './App.css'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/checkout' element={console.log('hello')} />
      </Routes>
    </>
  )
}

export default App
