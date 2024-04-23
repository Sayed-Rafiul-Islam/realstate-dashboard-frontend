"use client"

import { useEffect, useState } from "react";
import LogInForm from "@/components/LogInForm";
import SignUpForm from "@/components/SignUpForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


export default function Authentication() {

    const router = useRouter()
    const [account,setAccount] = useState(true)

    useEffect(()=> {
      const isSignedIn = Boolean(localStorage.getItem('accessToken'))
      
      if (isSignedIn) {
        router.push('/')
      }
    })

  return (
    <div className='flex justify-center'>
            {
                account ?
              <div className="mt-48">
                <h1 className="text-4xl font-bold text-center">Log In</h1>
                <LogInForm />
                 <p>Don't have an account? Go to <button onClick={()=>setAccount(false)} className="text-green-500">Sign Up</button></p>
              </div>
            :
              <div className="mt-48">
                <h1 className="text-4xl font-bold text-center">Sign Up</h1>
                <SignUpForm />
                <p>Already have an account? Go to <button onClick={()=>setAccount(true)} className="text-green-500">Log In</button></p>
              </div> 
           
            }
  </div>
  )
}
