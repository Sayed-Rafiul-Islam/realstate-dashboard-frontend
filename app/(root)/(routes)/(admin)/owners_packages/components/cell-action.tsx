"use client"

import { Copy, Edit, MoreHorizontal, Trash, Trash2 } from "lucide-react"
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
import { OwnerPackageProps, OwnerPackagesReducersProps, PackageProps } from "@/types"
import { useDispatch, useSelector } from "react-redux"
import { AlertModal } from "@/components/modals/alert-modal"
import { removePackage } from "@/redux/packages/packagesSlice"
import api from "@/actions/api"
import { removeAllOwnerPackage } from "@/redux/ownerPackages/ownerPackagesSlice"

interface CellActionProps {
    data : OwnerPackageProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        setLoading(true)
        const result = await api.delete(`deleteOwnerPackage?id=${data._id}`,{validateStatus: () => true})
        if(result.status === 200) {
            dispatch(removeAllOwnerPackage(data))
            toast.success('Owner package removed.')
        } else {
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

            <button onClick={()=>setOpen(true)}><Trash2 className="hover:text-red-500 transition-all" size={15} /></button>
        </>
    )
}