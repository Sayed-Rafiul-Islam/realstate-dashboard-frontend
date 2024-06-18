"use client"

interface DocumentSettingsClientProps {
    data : DocumentSettingsProps[]
}


import { useEffect, useState } from "react"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { DocumentSettingsProps } from "@/types"

export const DocumentSettingsClient : React.FC<DocumentSettingsClientProps> = ({data}) => {
    return (
        <>         
            <DataTable pagination={true} searchKey="name" columns={columns} data={data} />
        </>
    )
}