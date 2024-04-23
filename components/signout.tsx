"use client"
import { useDispatch } from "react-redux";
import { Button } from "./ui/button"
import { removeUser } from "@/redux/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";

const SignOut = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const path = usePathname()
    return ( 
        <Button onClick={()=>dispatch(removeUser()) && router.push('/authentication')} className={path === '/authentication' ? 'hidden' : "fixed right-12 top-8"} variant='destructive'>Log Out</Button>
     );
}
 
export default SignOut;