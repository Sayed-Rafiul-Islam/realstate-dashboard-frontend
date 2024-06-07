"use client"

import { useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MaintainerInfoReducerProps, PropertiesReducerProps, TenantDocumentsReducerProps, TenantInfoReducerProps, UnitsReducerProps } from "@/types";
import { DocumentsClient } from "./components/client";
import Link from "next/link";


const DocumnetsPage = () => {
    const router = useRouter()
    const maintainer = useSelector(({maintainerInfoReducer} : MaintainerInfoReducerProps)=> maintainerInfoReducer).maintainerInfo
    const {tenantDocuments} = useSelector(({tenantDocumentsReducer} : TenantDocumentsReducerProps) => tenantDocumentsReducer)

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    // const thisTenantDocuments = tenantDocuments.filter(({tenantId})=>tenantId === tenant._id)




    // const formattedDocuments = thisTenantDocuments.map((
    //     {
    //         _id,
    //         type,
    //         tenantId,
    //         propertyId,
    //         unitId,
    //         tenantName,
    //         docFront,
    //         docBack,
    //         document,
    //         status,
    //     },index : number) => {
    //         const property = properties.filter((item)=> item._id === propertyId)[0]
    //         const unit = units.filter((item)=> item._id === unitId)[0]
    //         return {
    //             serial : index + 1,
    //             _id,
    //             tenantId,
    //             propertyId,
    //             unitId,
    //             type,
    //             tenantName,
    //             property_unit : `${property.name}/${unit.name}`,
    //             docFront,
    //             docBack,
    //             document,
    //             status
    //         }
           
    // })


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
                    {/* <DocumentsClient data={formattedDocuments} /> */}
                </div>
            </div>
        </div>
     );
}
 
export default DocumnetsPage;