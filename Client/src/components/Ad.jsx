import React from "react";
import Cyberpunk from "../assets/Cyberpunk.mp4";
import Cyberpunk_logo from '../assets/cyberpunk0.png';
import { Button } from '../components/Button';
import "./ad.css"
function Ad() {
    return(
        <>
        <div className='Advertise'>
            <video autoPlay loop muted >
                <source src={Cyberpunk} type="video/mp4" />
            </video>
            <div className="buy-now">
                <img className='cyber_logo' src={Cyberpunk_logo} alt='' />
                <Button/>
            </div>
        </div>
        </>
    )
}
export default Ad;