import React from "react";
import Zelda from '../assets/Zelda.png';
import { Button } from './Button';

import "./Recommend.css"
function Recommend() {
    return(
        <>
        <div className="Suggest">
            <div className='Ad2'>
                <img className='Recommend' src={Zelda} alt='' />
                <Button/>
            </div>
        </div>
        
        </>
    )
}
export default Recommend;