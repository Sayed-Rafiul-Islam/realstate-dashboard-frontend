"use client"

import { Edit, Eye, MoreHorizontal, Printer, Trash } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { ExpenseTypeColumn } from "./column"
import { removeOwnerExpenseType } from "@/redux/data/owner/settings/expenseTypesSlice"
import api from "@/actions/api"

interface CellActionProps {
    data : ExpenseTypeColumn
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const onDelete = async () => {
        setLoading(true)
        const result = await api.delete(`deleteExpenseType?id=${data._id}` ,{validateStatus: () => true})
        if ( result.status === 200) {
            dispatch(removeOwnerExpenseType(data))        
            toast.success("Expense type removed")
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
                    <DropdownMenuItem className="cursor-pointer"
                     onClick={()=>router.push(`/settings/expense_type/${data._id}`)}
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