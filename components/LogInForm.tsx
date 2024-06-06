"use client"
import api from "@/actions/api"
import { addUser } from "@/redux/auth/authSlice"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import Link from "next/link"
import { Button } from "./ui/button"
import { Eye, EyeOff } from "lucide-react"

export default function LogInForm() {

    const router = useRouter()
    const dispatch = useDispatch()
    

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ message, setMessage] = useState('')

    const handleSubmit = async () => {
        setLoading(true)
        window.localStorage.removeItem("accessToken")
        // setMessage("Logging in...")
        
        if (email === '' || password === '') {
            setMessage("Fill in all the fields")
        }
        else {
            const {status,data} = await api.post(`login`,{email : email,password},{validateStatus: () => true})
            if (status === 404) {
                setMessage("No account with this Email")
            } else if (status === 400) {
                setMessage("Wrong Password")
            } else if (status === 200) {
                setMessage("")
                dispatch(addUser(data))
                window.localStorage.setItem("accessToken",data.accessToken)
                window.location.assign('/')
            }
            
        } 
        setLoading(false)
    }
  return (
    <div className="flex flex-col mt-4">
        <div 
            // className="border-b border-r dark:border-zinc-600 flex flex-col w-full rounded-lg gap-4 p-4"
            >
            <Label>Email</Label>
            <Input 
                className="mb-2"
                type="text" 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}
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

            <div className="flex justify-between items-center">
            <span className="text-sm flex items-center gap-2"><Checkbox /> Remember me</span>
            <Link className="text-sm text-blue-500" href='#'>Forgot password?</Link>
            </div>
            {/* <label htmlFor="">User Name : </label>
            <input className="text-zinc-700 outline-none border-b border-zinc-300
            dark:border-zinc-700 dark:placeholder:text-zinc-700 dark:text-zinc-300 dark:bg-inherit
            focus:border-b-2 focus:border-zinc-700" 
            type="text" 
            value={email} 
            onChange={(e)=> setemail(e.target.value)}
            placeholder="john Doe"
            /> */}
            {/* <label htmlFor="">Password : </label>
            <input className="text-zinc-700 outline-none border-b border-zinc-300
            dark:border-zinc-700 dark:placeholder:text-zinc-700 dark:text-zinc-300 dark:bg-inherit
            focus:border-b-2 focus:border-zinc-700"
            type="password" 
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="***********"
            /> */}
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


