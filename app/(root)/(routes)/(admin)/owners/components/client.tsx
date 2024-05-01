"use client"

interface OwnersClientProps {
    data : OwnerProps[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { OwnerProps, PackagesReducersProps } from "@/types"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { addOwnerPackage } from "@/redux/ownerPackages/ownerPackagesSlice"
import { useDispatch, useSelector } from "react-redux"
import { AssignPackageModal } from "@/components/modals/assign-package-modal"

export const OwnersClient : React.FC<OwnersClientProps> = ({data}) => {

    // ---------------------------------------------------------------------------------------------
    // anti hydration

    const [isMounted, setIsMounted] = useState(false)
    const dispatch = useDispatch()

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