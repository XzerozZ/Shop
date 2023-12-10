import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



function Logincard() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/add");
    }

  }, []);

  async function login() {
    console.log(email,password);
    let item= {email,password};
    let result = await fetch("https://reqres.in/api/users",{
      method:'POST',
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      },
      body:JSON.stringify(item)
    }).then((response)=>{
      response.json().then((result)=>{
        console.log(result);
        localStorage.setItem("user-info",JSON.stringify(result))
        history.push("/add");
      })
    })

  };
  return (
    <>
    <div className="flex border-2 w-[632px] h-[450px] flex-col mx-auto mt-[130px] bg-[#F5F4F4] rounded-md">
        <h1 className="text-center text-5xl p-[25px]">Login</h1>
        <div className="ml-auto mr-auto gap-10">
          <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              
              </label>
              <input type="text" placeholder="Email or username" className="input input-bordered h-[60px] w-[535px] " onChange={(e)=>setEmail(e.target.value)}/>
              
          </div>
          <div className="form-control m-auto">
              <label className="label">
                <span className="label-text">Password</span>
              
              </label>
              <input type="password" placeholder="Enter your password" className="input input-bordered h-[60px] w-[535px] " onChange={(e)=>setPassword(e.target.value)}/>
              
          </div>
        </div>
       
        <div className="flex ml-auto mr-auto mt-5">
        <button className="text-[25px] w-[150px] h-[60px] bg-[#B52245] rounded-full text-white border-[#B52245]" onClick={login}>Login</button>
          </div>
        <div className="text-center">
            <Link className="text-center" to="/">Don't have an account? <span className="underline hover:decoration-2">Sign up</span></Link>
        </div>



    </div>
    </>
    
  );
}

export default Logincard;

