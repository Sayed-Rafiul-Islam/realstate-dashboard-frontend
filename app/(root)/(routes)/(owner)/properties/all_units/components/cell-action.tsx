"use client"

import { Edit, Eye, MoreHorizontal, Trash, Trash2 } from "lucide-react"
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
import { UnitColumn } from "./column"
import { removeUnit } from "@/redux/units/unitsSlice"
// import { AlertModal } from "@/components/modals/alert-modal"
// import { deleteCategory } from "@/app/actions/categories"

interface CellActionProps {
    data : UnitColumn
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        // fetch
        dispatch(removeUnit(data._id))
        setOpen(false)
        toast.success("Unit Deleted")
    }



    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={()=>setOpen(false)} 
                onConfirm={()=>onDelete()} 
                loading={loading}
            />
            <button onClick={()=>setOpen(true)}><Trash2 className="hover:text-red-600 transition-all" size={15} /></button>
        </>
    )
}