"use client"

import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { useState } from "react"
import { OrderProps } from "@/types"
import { PreviewOrder } from "@/components/modals/preview-order-modal"
import { OrdersColumnProps } from "./column"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import api from "@/actions/api"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { removeOrder } from "@/redux/orders/ordersSlice"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"

interface CellActionProps {
    data : OrdersColumnProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        setLoading(true)
        const result = await api.delete(`deleteOrder?id=${data._id}` ,{validateStatus: () => true})
        if ( result.status === 200) {
            dispatch(removeOrder(data))        
            toast.success("Order Removed")
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
            <PreviewOrder
                isOpen={openPreview} 
                onClose={()=>setOpenPreview(false)} 
                data={data}
                loading={loading} 
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
                        disabled={data.status === "Canceled" ? true : false}
                        className="cursor-pointer"
                        onClick={()=>router.push(`/all_orders/${data._id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>setOpenPreview(true)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>setOpen(true)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}