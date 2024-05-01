"use client"

import {  Reply } from "lucide-react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { MessageProps } from "@/types"
import { useDispatch } from "react-redux"
import { ReplyModal } from "@/components/modals/reply-modal"
import { updateMessageStatus } from "@/redux/messages/messagesSlice"
// import { AlertModal } from "@/components/modals/alert-modal"
// import { deleteCategory } from "@/app/actions/categories"

interface CellActionProps {
    data : MessageProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleReply = async ( reply : string) => {
        console.log(reply)
        setOpen(false)
    }

    const handleSeen = async () => {
        dispatch(updateMessageStatus(data))
        setOpen(true)
    }


    return (
        <>
            <ReplyModal
            isOpen={open} 
            onClose={()=>setOpen(false)} 
            onConfirm={(reply : string)=> handleReply(reply)} 
            loading={loading}
            data={data} />

            <button><Reply onClick={handleSeen} size={15} /></button>
        </>
    )
}