"use client"

interface OwnersClientProps {
    data : OwnerColumn[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { OwnerColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useDispatch } from "react-redux"

export const OwnersClient : React.FC<OwnersClientProps> = ({data}) => {

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
        </>
    )
}