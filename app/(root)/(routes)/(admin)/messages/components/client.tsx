"use client"

interface MessagesClientProps {
    data : MessageProps[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { MessageProps, PackagesReducersProps } from "@/types"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { AssignPackageModal } from "@/components/modals/assign-package-modal"

export const MessagesClient : React.FC<MessagesClientProps> = ({data}) => {

    // ---------------------------------------------------------------------------------------------
    // anti hydration

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }        
        
    return (
        <>

            <DataTable pagination={true} searchKey="email" columns={columns} data={data} />
            <Toaster />
        </>
    )
}