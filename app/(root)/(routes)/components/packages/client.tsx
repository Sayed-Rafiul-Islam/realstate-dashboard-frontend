"use client"

interface PackageClientProps {
    data : PackageProps[]
}

import { Toaster } from "react-hot-toast"
import { PackageProps } from "@/types"
import { columns } from "./column"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/ui/data-table"


export const ThreePackagesClient : React.FC<PackageClientProps> = ({data}) => {

    // const packages : PackageProps[] = data.map((
    //     {
    //         _id,
    //         label,
    //         monthlyPrice,
    //         yearlyPrice,
    //         maxProperty,
    //         maxUnit,
    //         status,
    //         trial
    //     } : PackageProps,index : number) => ({
    //         // serial : index + 1,
    //         _id,
    //         label,
    //         monthlyPrice,
    //         yearlyPrice,
    //         maxProperty,
    //         maxUnit,
    //         status,
    //         trial
    // }))

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
            <DataTable pagination={false} columns={columns} data={data} />
        </>
        
    )
}