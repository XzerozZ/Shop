import React from 'react'
import gta from "../assets/gtav.jpg"
export const CardHis = () => {
  return (
   <>
   <div className='flex flex-row border-[#202020] border rounded-xl bg-[#202020]'>
   <img src={gta} alt="" className='w-[172px] h-[184px] m-[20px]'/>
       <div className='flex flex-auto '>
            <div className='basis-1/2'>
                
                <div className='text-[25px] mt-[30px]'>
                Grand theft auto V: Premium Edition
                </div>
                <div>
                <div className='border border-[#315EFB] bg-[#315EFB] w-[104px] h-[25px] text-[10px] text-center rounded-sm py-[3px] '>OPEN WORLD</div>
                </div>
            </div>

            <div className='basis-1/2 '>
                <div className='flex mt-[90px]'>
                    <div className='basis-1/3 text-[25px] text-center '>
                        B 1000
                    </div>

                    <div className='basis-1/3 text-[25px] text-center'>
                        3
                    </div>

                    <div  className='basis-1/3 text-[25px] text-center'>
                        B 3000
                    </div>
                </div>
            </div>

       </div>

   </div>
   </>
  )
}
