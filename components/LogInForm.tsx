"use client"
import api from "@/actions/api"
import { addUser } from "@/redux/auth/authSlice"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"

export default function LogInForm() {

    const router = useRouter()
    const dispatch = useDispatch()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [ message, setMessage] = useState('')

    const handleSubmit = async () => {
        localStorage.removeItem("accessToken")
        setMessage("Logging in...")
        
        if (userName === '' || password === '') {
            setMessage("Fill in all the fields")
        }
        else {
            const {status,data} = await api.post(`login`,{user_name : userName,password},{validateStatus: () => true})
            if (status === 404) {
                setMessage("No account with this User Name")
            } else if (status === 400) {
                setMessage("Wrong Password")
            } else if (status === 200) {
                setMessage("Login Successful")
                dispatch(addUser(data))
                localStorage.setItem("accessToken",data.accessToken)
                window.location.assign('/')
            }
            
        } 
    }
  return (
    <div className="flex flex-col rounded-lg gap-4 p-4">
        <div className="border-b border-r dark:border-zinc-600 flex flex-col w-full rounded-lg gap-4 p-4">
            <label htmlFor="">User Name : </label>
            <input className="text-zinc-700 outline-none border-b border-zinc-300
            dark:border-zinc-700 dark:placeholder:text-zinc-700 dark:text-zinc-300 dark:bg-inherit
            focus:border-b-2 focus:border-zinc-700" 
            type="text" 
            value={userName} 
            onChange={(e)=> setUserName(e.target.value)}
            placeholder="john Doe"
            />
            <label htmlFor="">Password : </label>
            <input className="text-zinc-700 outline-none border-b border-zinc-300
            dark:border-zinc-700 dark:placeholder:text-zinc-700 dark:text-zinc-300 dark:bg-inherit
            focus:border-b-2 focus:border-zinc-700"
            type="password" 
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="***********"
            />
            <button onClick={handleSubmit}>
                Log In
            </button>
            
        </div>

        <p className=
         "text-red-500">
            {message}
        </p>
      
    </div>
  )
}


