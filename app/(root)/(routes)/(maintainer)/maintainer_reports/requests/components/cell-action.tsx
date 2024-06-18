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
import { MaintainanceRequestProps } from "@/types"


interface CellActionProps {
    data : MaintainanceRequestProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [loading, setLoading] = useState(false)


    return (
        <>
            <PreviewRequest
                isOpen={openPreview} 
                onClose={()=>setOpenPreview(false)} 
                data={data} 
                status={true}
                disable={data.paymentStatus === "Paid" && data.status === "Complete" ? true : false}
            />


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
                    <DropdownMenuItem 
                        onClick={()=>router.push(`/maintainer_requests/${data._id}`)}
                        disabled={data.paymentStatus === "Paid" && data.status === "Complete" ? true : false}
                    >
                        
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setOpenPreview(true)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}