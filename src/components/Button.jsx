import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button() {
  return (
    <button class="cybr-btn">
      BUY <span aria-hidden> NOW</span>
      <span aria-hidden class="cybr-btn__glitch">BUY NOW</span>
      <span aria-hidden class="cybr-btn__tag">R34</span>
    </button>
  );
}