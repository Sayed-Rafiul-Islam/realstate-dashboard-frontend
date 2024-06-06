"use client"

import { useEffect, useState } from "react";
import LogInForm from "@/components/LogInForm";
import SignUpForm from "@/components/SignUpForm";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from '@/images/logo_expanded.png'


export default function Authentication() {

    const router = useRouter()
    const [account,setAccount] = useState(true)

    useEffect(()=> {
      const isSignedIn = Boolean(window.localStorage.getItem('accessToken'))
      
      if (isSignedIn) {
        router.push('/')
      }
    })

  return (
    <div className='flex flex-col h-screen items-center justify-center bg-gray-100'>
            <div className=" lg:w-1/3 md:w-1/2 w-11/12 p-10 bg-white h-4/5">
              <div className="h-full flex flex-col justify-center">
                  <div className="relative mx-auto h-[60px] w-[250px] mb-10">
                    <Image fill src={logo} alt="liliput logo" />
                  </div>

                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-xl text-amber-500">{account ? "Sign In" : "Sign Up"}</h3>
                    {
                      account ?
                      <h4 className="text-sm">New owner? <button onClick={()=>setAccount(false)} className="text-blue-500">Sign Up</button></h4>
                      :
                      <h4 className="text-sm">Already an owner? <button onClick={()=>setAccount(true)} className="text-blue-500">Sign In</button></h4>
                    }
                 
                </div>
                  {
                    account ?
                  <div className="">
                    {/* <h1 className="text-4xl font-bold text-center">Log In</h1> */}
                    <LogInForm />
                    {/* <p>Don't have an account? Go to </p> */}
                  </div>
                :
                  <div className="">
                    {/* <h1 className="text-4xl font-bold text-center">Sign Up</h1> */}
                    <SignUpForm />
                    {/* <p>Already have an account? Go to <button onClick={()=>setAccount(true)} className="text-green-500">Log In</button></p> */}
                  </div> 
              
                }
              
                </div>
            </div>
            
  </div>
  )
}
