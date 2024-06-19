"use client"

import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
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

interface CellActionProps {
    data : PackageProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const [openPreview, setOpenPreview] = useState(false)

    return (
        <>
            <PreviewPackage
                isOpen={openPreview} 
                onClose={()=>setOpenPreview(false)} 
                data={data}
            />
            
            <button onClick={()=>setOpenPreview(true)} className="hover:text-indigo-500 transition-all"><Eye className="h-4 w-4 mr-2"/></button>
        </>
    )
}