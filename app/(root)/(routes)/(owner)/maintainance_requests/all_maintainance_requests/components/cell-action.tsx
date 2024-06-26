"use client"

import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AlertModal } from "@/components/modals/alert-modal"

import { removeMaintainanceRequests } from "@/redux/maintainanceRequests/maintainanceRequestsSlice"
import { PreviewRequest } from "@/components/modals/preview-maintainance-request"
import { MaintainanceRequestColumn } from "./column"
import api from "@/actions/api"
import { removeOwnerMaintainanceRequests } from "@/redux/data/owner/maintainanceRequestsSlice"


interface CellActionProps {
    data : MaintainanceRequestColumn
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        setLoading(true)
        const result = await api.delete(`deleteRequest?id=${data._id}` ,{validateStatus: () => true})
        if ( result.status === 200) {
            dispatch(removeOwnerMaintainanceRequests(data))        
            toast.success("Request Removed")
        } else {
            toast.error("Something went wrong.")
        }
       
        setLoading(false)
        setOpen(false)
    
}


    return (
        <>
            <AlertModal
            isOpen={open} 
            onClose={()=>setOpen(false)} 
            onConfirm={onDelete} 
            loading={loading} />

            <PreviewRequest
            isOpen={openPreview} 
            onClose={()=>setOpenPreview(false)} 
            data={data} />


            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={()=>router.push(`/maintainance_requests/${data._id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setOpenPreview(true)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setOpen(true)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}