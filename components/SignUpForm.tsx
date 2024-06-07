"use client"

import { signUp } from "@/actions/signUp"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Eye, EyeOff } from "lucide-react"

export default function SignUpForm() {

    const router = useRouter()

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [ message, setMessage] = useState('')

    const handleSubmit = async () => {
        localStorage.removeItem("accessToken")
        setLoading(true)

        if (name === '' || password1 === '' || password === '') {
            setMessage("Fill in all the fields")
        } else if (password !== password1) {
            setMessage("Passwords did not matched")
        }
        else {
            const role = 'owner'
            const {status,data} = await signUp(name,password,role)
            if (status === 400) {
                setMessage("Email already in use")
            }
            else {
                localStorage.setItem("accessToken",data.accessToken)
                setMessage("")
                router.push('/')
            }
        } 
        setLoading(false)
    }
  return (
    <div className="">
        <div className="mt-4">
                <Label>Email</Label>
                <Input
                className="mb-2"
                type="email" 
                value={name} 
                onChange={(e)=> setName(e.target.value)}
                placeholder="example@gmail.com"
            />
            <Label>Password</Label>
            <div className="mb-2 relative">
                <Button onClick={()=>setShow(!show)} className="absolute right-0" variant='ghost'>
                    {
                        show ?
                        <EyeOff size={15}/>
                        :
                        <Eye size={15}/>
                    }
                </Button>
                <Input 
                    type={show ? "text" : "password"} 
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)}
                    placeholder="***********"
                />
            </div>

            <Label>Re-enter Password</Label>
            <Input 
                    type="password" 
                    value={password1} 
                    onChange={(e)=> setPassword1(e.target.value)}
                    placeholder="***********"
                />
            {/* <label htmlFor="">Password : </label>
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
            />  */}

            <Button disabled={loading} className="bg-blue-500 mt-4 w-full" onClick={handleSubmit}>
                Sign In
            </Button>
        </div>

        <p className="text-red-500">
            {message}
        </p>
      
    </div>
  )
}
