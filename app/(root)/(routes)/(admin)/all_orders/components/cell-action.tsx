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
import { OrderProps } from "@/types"
import { AlertModal } from "@/components/modals/alert-modal"
import { useDispatch } from "react-redux"
import { removeOrder } from "@/redux/orders/ordersSlice"
import { PreviewOrder } from "@/components/modals/preview-order-modal"
// import { AlertModal } from "@/components/modals/alert-modal"
// import { deleteCategory } from "@/app/actions/categories"

interface CellActionProps {
    data : OrderProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)



    return (
        <>
            <PreviewOrder
            isOpen={open} 
            onClose={()=>setOpen(false)} 
            data={data}
            loading={loading} />
            <button onClick={()=>setOpen(true)}><Eye className="hover:text-indigo-600 transition-all" size={15} /></button>
        </>
    )
}