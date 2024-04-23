"use client"

import { signUp } from "@/actions/signUp"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUpForm() {

    const router = useRouter()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [ message, setMessage] = useState('')

    const handleSubmit = async () => {
        localStorage.removeItem("accessToken")
        setMessage("Signing up...")
        if (name === '' || password1 === '' || password === '') {
            setMessage("Fill in all the fields")
        } else if (password !== password1) {
            setMessage("Passwords did not matched")
        }
        else {
            const role = 'user'
            const {status,data} = await signUp(name,password,role)
            localStorage.setItem("accessToken",data.accessToken)
            if (status === 400) {
                setMessage("Email already in use")
            }
            else {
                setMessage("User created successfully")
                router.push('/')
            }
        } 
    }
  return (
    <div className="flex flex-col rounded-lg gap-4 p-4">
        <div className="flex flex-col w-full rounded-lg gap-4 p-4 border-b border-r dark:border-zinc-6">
            <label htmlFor="">User Name :</label>
            <input className="text-zinc-700 outline-none border-b border-zinc-300
            dark:border-zinc-700 dark:placeholder:text-zinc-700 dark:text-zinc-300 dark:bg-inherit
            focus:border-b-2 focus:border-zinc-700" 
            type="text" 
            value={name} 
            onChange={(e)=> setName(e.target.value)} 
            placeholder="Robinson Jeager"
            />
            <label htmlFor="">Password : </label>
            <input className="text-zinc-700 outline-none border-b border-zinc-300
            dark:border-zinc-700 dark:placeholder:text-zinc-700 dark:text-zinc-300 dark:bg-inherit
            focus:border-b-2 focus:border-zinc-700" 
            type="password" value={password} 
            onChange={(e)=> setPassword(e.target.value)} 
            placeholder="*****************"
            /> 
            <label htmlFor="">Re-enter Password : </label>
            <input className="text-zinc-700 outline-none border-b border-zinc-300
            dark:border-zinc-700 dark:placeholder:text-zinc-700 dark:text-zinc-300 dark:bg-inherit
            focus:border-b-2 focus:border-zinc-700" 
            type="password" value={password1} 
            onChange={(e)=> setPassword1(e.target.value)} 
            placeholder="*****************"
            /> 

            <button onClick={handleSubmit}>
                Sign Up
            </button>
        </div>

        <p className=
         "text-red-500">
            {message}
        </p>
      
    </div>
  )
}
