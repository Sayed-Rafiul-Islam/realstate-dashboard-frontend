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
import { OrderProps, OwnerTenantsReducerProps, TenantsReducerProps } from "@/types"
import { AlertModal } from "@/components/modals/alert-modal"
import { useDispatch, useSelector } from "react-redux"
import { removeOrder } from "@/redux/orders/ordersSlice"
import { PreviewOrder } from "@/components/modals/preview-order-modal"
import { UnitColumn } from "./column"
import { removeUnit } from "@/redux/units/unitsSlice"
import { PreviewUnit } from "@/components/modals/preview-unit"
import api from "@/actions/api"
import { updateOwnerInfo } from "@/redux/info/ownerInfoSlice"
import { updateProperty } from "@/redux/properties/propertiesSlice"
import { removeOwnerUnit } from "@/redux/data/owner/unitsSlice"
import { updateOwnerProperty } from "@/redux/data/owner/propertiesSlice"

interface CellActionProps {
    data : UnitColumn
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()


    const [open, setOpen] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [loading, setLoading] = useState(false)

    const isTenant = useSelector(({ownerTenantsReducer} : OwnerTenantsReducerProps) => ownerTenantsReducer).ownerTenants
    .filter((tenant) => tenant.property._id === data.property._id && tenant.unit._id === data._id)



    const onDelete = async () => {
        const result = await api.delete(`deleteUnit?id=${data._id}&ownerId=${data.property.owner._id}&propertyId=${data.property._id}`,{validateStatus: () => true})
        if (result.status === 200) {
            dispatch(removeOwnerUnit(data._id))
            dispatch(updateOwnerInfo(result.data.updatedOwner))
            dispatch(updateOwnerProperty(result.data.updatedProperty))
            toast.success("Unit Deleted")
        } else {
            toast.error("Remove associated tenants first")
        }
        setOpen(false)
    }



    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={()=>setOpen(false)} 
                onConfirm={()=>onDelete()} 
                loading={loading}
            />
            <PreviewUnit 
                isOpen={openPreview}
                onClose={()=>setOpenPreview(false)}
                data={data}
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
                    <DropdownMenuItem onClick={()=>router.push(`/properties/all_units/${data._id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={()=>setOpenPreview(true)}
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        disabled={isTenant.length > 0 ? true : false}
                        onClick={()=>setOpen(true)}
                    >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}