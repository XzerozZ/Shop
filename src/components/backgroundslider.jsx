import React,{useState} from "react";
import './backgroundslider.css'
import imageSlide from "./data";
const BackgroundSlider = () =>{
    const[currentState,setCurrentState]=useState(0)
    const bgImageStyle ={
        backgroundImage: 'url(${imageSlide[currentState].url})',
        backgroundPosition :'center',
        backgroundSize: 'cover',   
        height:'100%'
    }
    return (
        <div className='countiner-style'>
            <div style={bgImageStle}></div>
        </div>
    )
}
export default BackgroundSlider;