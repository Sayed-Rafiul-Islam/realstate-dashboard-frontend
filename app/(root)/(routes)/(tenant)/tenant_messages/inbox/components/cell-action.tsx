"use client"

import { Eye } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MessageProps, TenantMessagesReducerProps } from "@/types"
import api from "@/actions/api"
import { PreviewMessage } from "@/components/modals/preview-message"
import { createOwnerMessage, updateOwnerMessage } from "@/redux/data/owner/messagesSlice"
import { FormProps } from "@/components/modals/compose-message-modal"
import toast from "react-hot-toast"
import { createTenantMessage, updateTenantMessage } from "@/redux/data/tenant/messagesSlice"
import { setRed } from "@/redux/message-red"

interface CellActionProps {
    data : MessageProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const dispatch = useDispatch()
    const [openPreview, setOpenPreview] = useState(false)
    const messages = useSelector(({tenantMessagesReducer} : TenantMessagesReducerProps) => tenantMessagesReducer).tenantReceivedMessages

    const onView = async () => {
        const result = await api.patch(`viewMessage`,{_id : data._id} ,{validateStatus: () => true})
        if ( result.status === 200) {
            dispatch(updateTenantMessage(result.data))    
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
        const result = await api.post(`createMessage`,data ,{validateStatus: () => true})
        if ( result.status === 200) {
            dispatch(createTenantMessage(result.data))        
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