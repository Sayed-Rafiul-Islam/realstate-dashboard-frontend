"use client"

import { Edit, Eye, MoreHorizontal, Printer, Trash } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { InvoiceTypeColumn } from "./column"
import { removeOwnerInvoiceType } from "@/redux/data/owner/settings/invoiceTypesSlice"
import api from "@/actions/api"

interface CellActionProps {
    data : InvoiceTypeColumn
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [loading, setLoading] = useState(false)


    const onDelete = async () => {
        setLoading(true)
        const result = await api.delete(`deleteInvoiceType?id=${data._id}` ,{validateStatus: () => true})
        if ( result.status === 200) {
            dispatch(removeOwnerInvoiceType(data))        
            toast.success("Invoice type removed")
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
                loading={loading} 
            />
            {/* <PreviewInvoice
                isOpen={openPreview} 
                onClose={()=>setOpenPreview(false)} 
                data={data}
            /> */}
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    {/* <DropdownMenuItem className="cursor-pointer" 
                    onClick={()=>setOpenPreview(true)}
                    >
                        <Eye className="h-4 w-4 mr-2"/>
                        Details
                    </DropdownMenuItem> */}
                    <DropdownMenuItem className="cursor-pointer"
                     onClick={()=>router.push(`/settings/invoice_type/${data._id}`)}
                     >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" 
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