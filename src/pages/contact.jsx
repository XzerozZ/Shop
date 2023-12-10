import co_founder1 from "../assets/co-founder1.jpg";
import React from 'react'
import Nav2 from "../components/Navbar";
import './contact.css'

export const ContactPages = () => {
  return (
  <>
  <Nav2/>
  <div className='Profile'>
    <img className="w-[100px] h-[50]" src={co_founder1} alt="" />
  </div>
  </>
  )
}
