import React from 'react'
import Ad from '../components/Ad';
import Cards from '../components/Cards';
import Recommend from '../components/Recommend';
export const MarketPages = () => {
  return (
  <>
  <div className='h-[800px]'>
    <Ad/>
  </div>
  <div className='h-[auto]'>
    <Cards/>
  </div>
  <div>
    <Recommend />
  </div>
  </>
  )
}