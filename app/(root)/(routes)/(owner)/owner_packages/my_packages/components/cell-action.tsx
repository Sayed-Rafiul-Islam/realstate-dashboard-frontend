"use client"

import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { removeInvoice } from "@/redux/invoices/invoicesSlice"
import toast from "react-hot-toast"
import { PreviewInvoice } from "@/components/modals/preview-invoice"
import { InvoiceProps, OwnerInfoReducerProps, OwnerPackageProps, PackageProps } from "@/types"
import { removeOwnerInvoice } from "@/redux/data/owner/invoicesSlice"
import api from "@/actions/api"
import { PreviewPackage } from "@/components/modals/preview-package"
import { PreviewOwnerPackage } from "@/components/modals/preview-owner-package"

interface CellActionProps {
    data : OwnerPackageProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const [openPreview, setOpenPreview] = useState(false)
    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo

    return (
        <>
            {
                owner.ownerPackage ?
                <PreviewOwnerPackage
                    isOpen={openPreview} 
                    onClose={()=>setOpenPreview(false)} 
                    data={data}
                    disabled={owner.ownerPackage === data._id ? true : false}
                />
                :
                <PreviewOwnerPackage
                    isOpen={openPreview} 
                    onClose={()=>setOpenPreview(false)} 
                    data={data}
                />
              
            }
                <button 
                    onClick={()=>setOpenPreview(true)} 
                    className="hover:text-blue-500 transition-all">
                    <Eye className="h-4 w-4 mr-2"/>
                </button>
            
            {/* <DropdownMenu>
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
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>router.push(`/invoices/${data._id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
        </>
    )
}