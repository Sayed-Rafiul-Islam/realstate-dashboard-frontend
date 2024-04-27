"use client"

interface PackageClientProps {
    data : PackageProps[]
}

import { Toaster } from "react-hot-toast"
import { PackageProps } from "@/types"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"

export const PackagesClinet : React.FC<PackageClientProps> = ({data}) => { 

    return (
        <>
            <DataTable searchKey="label" columns={columns} data={data} />
            <Toaster />
        </>
    )
}