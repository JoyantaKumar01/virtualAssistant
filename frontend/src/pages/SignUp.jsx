import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios"
function SignUp() {
    const [showPassword,setShowPassword]=useState(false)
    const {serverUrl}=useContext(userDataContext)
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [err,setErr]=useState("")
    const [loading, setLoading] = useState(false)

    const handleSignUp=async (e)=>{
      e.preventDefault()
      setErr("")
      setLoading(true)
      try {
        let result=await axios.post(`${serverUrl}/api/auth/signup`,{name,email,password},{withCredentials:true})
        console.log(result)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
         console.log("BACKEND RESPONSE:", error.response?.data)
        setErr(error.response?.data?.message || "Something went wrong")
      }
    }
  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`}}>
       <form className='w-[90%] h-[340px] max-w-[290px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[15px] px-[15px]' onSubmit={handleSignUp}>
        <h1 className='text-white text-[20px] font-semibold mb-[30px]'>Register to <span className='text-blue-400'>Virtual Assistant</span></h1>
        <input type="text" placeholder='Enter your Name' className='w-full h-[30px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[15px]' required onChange={(e)=>setName(e.target.value)}value={name}/>

        <input type="email" placeholder='Email' className='w-full h-[30px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[15px]' required onChange={(e)=>setEmail(e.target.value)}value={email}/>
        
        <div className='w-full h-[30px]  border-2 border-white bg-transparent text-white rounded-full text-[15px] relative'>
            <input type={showPassword?"text":"password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px]' required onChange={(e)=>setPassword(e.target.value)}value={password}/>
            {!showPassword && <IoEye className='absolute top-[7px] right-[12px] w-[15px] h-[15px] text-[white]' onClick={()=>setShowPassword(true)} />}
              {showPassword && <IoEyeOff className='absolute top-[7px] right-[12px] w-[15px] h-[15px] text-[white] cursor-pointer' onClick={()=>setShowPassword(false)} />}    
            
        </div>
        {err.length>0 && <p className='text-red-500 text-[17px]'>
          *{err}
          </p>}
        <button type="submit" className='min-w-[100px] h-[30px] text-black font-semibold bg-white rounded-full text-[19px]' disabled={loading}>{loading?"Loading...":" Sign Up"}
</button>
        <p className='text-[white] text-[15px] cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account ? <span className='text-blue-400'>Sign In</span></p>

       </form>
    </div>
  )
}

export default SignUp