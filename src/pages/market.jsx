import React from 'react'
import './market.css';
import Nav from "../components/NAVX";
import Cyberpunk from "../assets/Cyberpunk.gif";
import Cyberpunk_logo from '../assets/cyberpunk0.png';
import { Button } from '../components/Button';
export const MarketPages = () => {
  return (
  <>
  <div className='Advertise'>
        <img  className="item-show" src={Cyberpunk} alt="" />
        <Nav/>
        <div class='z-1' className='buy-now'>
          <img className='cyber_logo' src={Cyberpunk_logo} alt='' />
          <Button/>
        </div>
        
  </div>
  </>
  )
}