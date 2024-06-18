"use client"

import { useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PropertiesReducerProps, TenantDocumentsReducerProps, TenantInfoReducerProps, UnitsReducerProps } from "@/types";
import { DocumentsClient } from "./components/client";
import Link from "next/link";


const DocumnetsPage = () => {
    const router = useRouter()
    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo
    const {tenantDocuments} = useSelector(({tenantDocumentsReducer} : TenantDocumentsReducerProps) => tenantDocumentsReducer)


    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
            <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                            <Link prefetch href='/'>Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>
                            Documents
                        </BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Documents</h1>
                    <Button onClick={()=>router.push('/tenant_documents/add')}>Add Document</Button>
                </div>
                <Separator />
                <div>
                    <DocumentsClient data={tenantDocuments} />
                </div>
            </div>
        </div>
     );
}
 
export default DocumnetsPage;