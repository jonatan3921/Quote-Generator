import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './pages/Homepage/Homepage'
import Footer from './components/Footer/Footer'
import Notes from './pages/Notes/Notes'
import Auth from './pages/Auth/Auth'

function App() {

  return (
    <BrowserRouter>
    <Header/>

    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/notes' element={<Notes/>}/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>

    <Footer/>
    </BrowserRouter>
  )
}

export default App
