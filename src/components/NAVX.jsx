import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx';
import './NAVX.css';

function NAVX() {
  const closeMobileMenu = () => setClick(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
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
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <i className="fa-regular fa-circle-user"></i>
        </div>
        <div className='sign-up'>
          <button onClick={openModal}>Sign In</button>
          {modalOpen && <Modal closeModal={closeModal} />} 
        </div>
      </nav>
    </>
  );
}

export default NAVX;