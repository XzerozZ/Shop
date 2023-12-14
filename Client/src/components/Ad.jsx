import React from "react";
import Cyberpunk from "../assets/Cyberpunk.gif";
import Cyberpunk_logo from '../assets/cyberpunk0.png';
import { Button } from '../components/Button';
function Ad() {
    return(
        <>
        <div className='Advertise'>
            <img  className="item-show" src={Cyberpunk} alt="" />
            <div  className='buy-now'>
                <img className='cyber_logo' src={Cyberpunk_logo} alt='' />
                <Button/>
            </div>
        </div>
         </>
    )
}
export default Ad;