import React from 'react';
import './Button.css';

export function Button() {
  return (
    <button className="cybr-btn">
      BUY <span aria-hidden> NOW</span>
      <span aria-hidden className="cybr-btn__glitch">BUY NOW</span>
      <span aria-hidden className="cybr-btn__tag">R34</span>
    </button>
  );
}