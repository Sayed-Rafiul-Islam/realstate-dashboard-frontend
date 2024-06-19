"use client"

import { Edit, Eye, MoreHorizontal, Trash, Trash2 } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { removeInvoice } from "@/redux/invoices/invoicesSlice"
import toast from "react-hot-toast"
import { PreviewInvoice } from "@/components/modals/preview-invoice"
import { InvoiceProps, PackageProps } from "@/types"
import { removeOwnerInvoice } from "@/redux/data/owner/invoicesSlice"
import api from "@/actions/api"
import { PreviewPackage } from "@/components/modals/preview-package"
import { MyOrdersColumnProps } from "./column"
import { removeOwnerOrder, updateOwnerOrder } from "@/redux/data/owner/ordersSlice"

interface CellActionProps {
    data : MyOrdersColumnProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    
    const router = useRouter()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const onDelete = async () => {
        setLoading(true)
        const result = await api.patch(`cancelOrder?id=${data._id}`,{validateStatus: () => true})
        if(result.status === 200) {
            dispatch(updateOwnerOrder(result.data))
            toast.success('Order canceled.')
        }
         else {
            toast.error('Something went wrong.')
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
            
            {
                data.status === "Pending" &&
                <button onClick={()=>setOpen(true)} className="text-red-500 hover:font-bold transition-all">Cancel</button>
            }
        </>
    )
}