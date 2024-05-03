"use client"

import { useEffect, useState } from "react"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"

interface PasswordModalProps {
    isOpen : boolean,
    onConfirm : (password : string) => void,
    loading : boolean
}

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "../ui/input"

export const PasswordModal : React.FC<PasswordModalProps> = ({
    isOpen,
    onConfirm,
    loading
}) => {
    const router = useRouter()
    const pathname = "/" + usePathname().split("/")[1]
    const [isMounted, setIsMounted] = useState(false)
    const [password, setPassword] = useState('')


    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }

    const onChange = (open:boolean) => {
        if(!open) {
            router.push(pathname)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Enter Password</DialogTitle>
                {/* <DialogDescription></DialogDescription> */}
            </DialogHeader>
            <div>
                <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button  variant='outline'  onClick={()=>router.push(pathname)}>
                    Back
                </Button>
                <Button disabled={loading} onClick={()=>onConfirm(password)}>
                    Continue
                </Button>
            </div>
        </DialogContent>
    </Dialog>
            

    )
}