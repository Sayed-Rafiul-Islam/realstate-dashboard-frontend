"use client"

import { Eye } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AdminMessagesReducerProps, MessageProps } from "@/types"
import api from "@/actions/api"
import { PreviewMessage } from "@/components/modals/preview-message"
import { updateOwnerMessage } from "@/redux/data/owner/messagesSlice"
import { createAdminMessage, updateAdminMessage } from "@/redux/data/admin/messagesSlice"
import { FormProps } from "@/components/modals/compose-message-modal"
import toast from "react-hot-toast"
import { setRed } from "@/redux/message-red"
import { useRouter } from "next/navigation"

interface CellActionProps {
    data : MessageProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const dispatch = useDispatch()
    const [openPreview, setOpenPreview] = useState(false)
    const messages = useSelector(({adminMessagesReducer} : AdminMessagesReducerProps) => adminMessagesReducer).adminReceivedMessages

    const onView = async () => {
        const result = await api.patch(`viewMessage`,{_id : data._id} ,{validateStatus: () => true})
        if ( result.status === 200) {
            dispatch(updateAdminMessage(result.data)) 
            const unread = messages.filter((m : MessageProps) => m.read === false)
            if (unread.length > 0) {
                dispatch(setRed(true))
            } else {
                dispatch(setRed(false))
            }   

            setOpenPreview(true)    
        }
    }

    const handleReply = async (data : FormProps) => {
        const result = await api.post(`createAdminMessage`,data ,{validateStatus: () => true})
        if ( result.status === 200) {
            dispatch(createAdminMessage(result.data))        
            toast.success("Response sent")
        }   else {
            toast.error("Something went wrong.")
        }
    }




    return (
        <>
            <PreviewMessage
                isOpen={openPreview} 
                onClose={()=>setOpenPreview(false)} 
                data={data}
                onReply={(data : FormProps)=>handleReply(data)}
            />
            

            <button onClick={onView} className="hover:text-blue-500 transition-all"> <Eye className="h-4 w-4 mr-2"/></button>
        </>
    )
}