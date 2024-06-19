"use client"

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
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
import { OwnerPackagesReducersProps, PackageProps } from "@/types"
import { useDispatch, useSelector } from "react-redux"
import { AlertModal } from "@/components/modals/alert-modal"
import { removePackage } from "@/redux/packages/packagesSlice"
import api from "@/actions/api"

interface CellActionProps {
    data : PackageProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        setLoading(true)
        const result = await api.delete(`deletePackage?id=${data._id}`,{validateStatus: () => true})
        if(result.status === 200) {
            dispatch(removePackage(data))
            toast.success('Package removed.')
        }
        else if (result.status === 400) {
            toast.error('Package is in use. Remove the owner packages first where this package is being used.')
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
                    <DropdownMenuItem onClick={()=>router.push(`/packages/${data._id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
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