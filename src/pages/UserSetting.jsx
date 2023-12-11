import React from 'react'
import Nav from '../components/NAVX'
import "./UserSetting.css"
import me from "../assets/me.png";
import { CardHis } from '../components/cardhis';
import { Footer } from '../components/footer';
export const UserSetting = () => {
  return (
    <>
   
   
    <Nav/>
    <body className='ml-[180px] mr-[180px]'>
        <h1 className='mt-[100px] text-[60px] text-left'>User Setting</h1>
        <div className='flex flex-row gap-2 rounded '>
            <div className='basis-1/4 rounded-xl flex flex-col h-[360px] bg-[#202020]'>
                    <div className='my-[20px] flex gap-8 ml-[40px] mr-[40px] '>
                        <span><img src={me} alt="me" className='w-[70px] h-[70px] rounded-full'/></span>
                        <span className='mt-4'>Natchapon Ponlaem</span>
                    </div>
                    <div className='text-center py-[16px] hover:bg-[#2a2a2a] '>Account</div>
                    <div className='text-center py-[16px] hover:bg-[#2a2a2a]'>Coupon</div>
                    <div className='text-center py-[16px] hover:bg-[#2a2a2a]'>History</div>
                    <div className='text-center pt-[16px] pb-[16px] hover:bg-[#2a2a2a]'>Setting</div>

            </div>
            <div className='basis-3/4 '>
                
                <div className='flex flex-col gap-3 pb-10'>
                     <CardHis/>
                     <CardHis/>
                     <CardHis/>
                     <CardHis/>

                    
                </div>
            
            </div>

            
        </div>
        
    </body>
    <Footer/>
   

   
    </>
  )
}
