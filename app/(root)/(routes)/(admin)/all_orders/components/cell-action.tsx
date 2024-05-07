"use client"

import { Eye } from "lucide-react"
import { useState } from "react"
import { OrderProps } from "@/types"
import { PreviewOrder } from "@/components/modals/preview-order-modal"

interface CellActionProps {
    data : OrderProps
}

export const CellAction : React.FC<CellActionProps> = ({data}) => {

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