"use client"

import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { useState } from "react"
import { InvoiceColumn } from "./column"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { removeInvoice } from "@/redux/invoices/invoicesSlice"
import toast from "react-hot-toast"
import { PreviewInvoice } from "@/components/modals/preview-invoice"

interface CellActionProps {
    data : InvoiceColumn
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [loading, setLoading] = useState(false)


    const onDelete = async () => {
        dispatch(removeInvoice(data))
        toast.success("Invoice Deleted.")
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
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>setOpenPreview(true)}>
                        <Eye className="h-4 w-4 mr-2"/>
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