
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {FaRegUserCircle} from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

function Nav2() {
  return (
    <>
    <nav className="">
    <div className="navbar bg-DDDDDD-100 bg-DDDDDD justify-between flex shadow-md">
    <div className="flex ">
            <div className="flex flex-row gap-0">
              <Link to="/"><img className="w-[100px] h-[50]" src={logo} alt="" /></Link>
            </div>
            <ul className="flex flex-column gap-10 ml-10">
              <li>
                <Link className="text-black text-[30px] hover:text-white" to="/console">Console</Link>
              </li>
              <li>
                <Link className="text-black text-[30px] hover:text-white" to="/videogame">Video Game</Link>
              </li>
              <li>
                <Link className="text-black text-[30px] hover:text-white" to="/about">About</Link>
              </li>
              <li>
                <Link className="text-black text-[30px] hover:text-white" to="/contact">Contact</Link>
              </li>
            </ul>
           
    </div>
    <div className="gap-10">
        <Link to="/cart"><MdOutlineShoppingCart className="text-black text-[40px] mr-[10px] hover:text-white" /></Link>
        <FaRegUserCircle className="text-black text-[40px] mr-[10px] hover:text-white"/>
    </div>
         
    </div>

    </nav>

   


    
</>
    
  
    
   

    
  );
}

export default Nav2;
