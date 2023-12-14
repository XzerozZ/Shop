import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPopup from './LoginPopup.jsx';
import logo from "../assets/logo.png";
import './NAVX.css';


function NAVX() {
  

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo'>
          <div className='logo'>
            <img className="w-[100px] h-[50]" src={logo} alt="" />
          </div>
          <h1 className='title'>BIZ-SHOP</h1>
        </Link>
        <div className='search-box'>
          <input className="search" type="text" placeholder="Search..." />
          <div className="icon-container">
             <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className='user-set'>
          <Link to='/cart'  className='cart'>
            <i className="w-20 fa-solid fa-cart-shopping"></i>
          </Link>
          <i className="fa-regular fa-circle-user"></i>
        </div>
          <LoginPopup />
      </nav>
    </>
  );
}

export default NAVX;