import { useState } from 'react'
import viteLogo from '/vite.svg'

import { LoginPages } from './pages/login'
import { MarketPages } from './pages/market'
import { ConsolePages } from './pages/console'
import { AboutPages } from './pages/about'
import { ContactPages } from './pages/contact'
import { VideogamePages } from './pages/videogame'
import { CartPages } from './pages/cart'
import { Route, Routes } from 'react-router-dom'
import { UserSetting } from './pages/UserSetting'


function App() {
  
  return (
    <>
    
   <Routes>
      <Route path="/" element={<MarketPages />} />
      <Route path="/login" element={<LoginPages />} />
      <Route path="/console" element={<ConsolePages />}/>
      <Route path="/videogame" element={<VideogamePages />}/>
      <Route path="/about" element={<AboutPages />}/>
      <Route path="/contact" element={<ContactPages />}/>
      <Route path="/cart" element={<CartPages />}/>
      <Route path='/user' element={<UserSetting />} />
   </Routes>
    </>
  )
}

export default App
