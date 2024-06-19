"use client"

import { useEffect, useState } from "react"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

interface AlertModal1Props {
    onOpen : boolean,
    onClose : () => void,
    onConfirm : () => void,
    description : any,
    title : any

}

export const AlertModal1 : React.FC<AlertModal1Props> = ({
    onOpen,
    onClose,
    onConfirm,
    description,
    title
}) => {
    
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }

    return (
        <Modal 
            title={title}
            description={description}
            isOpen={onOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant='outline' onClick={onClose}>
                    Cancel
                </Button>
                <Button className="bg-green-500 hover:bg-green-600" onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    )
}