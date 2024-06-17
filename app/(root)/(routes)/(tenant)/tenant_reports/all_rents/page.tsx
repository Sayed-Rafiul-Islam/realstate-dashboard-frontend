"use client"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { RentsClient } from "./components/client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { TenantRentsReducerProps } from "@/types";
import { useSelector } from "react-redux";


const RentsPage = () => {

    const rents = useSelector(({tenantRentsReducer} : TenantRentsReducerProps)=> tenantRentsReducer).tenantRents

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
            <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                            <Link prefetch href='/'>Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                            <Link prefetch href='/tenant_reports/all_rents'>Report</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>
                            All Rents
                        </BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Rents</h1>
                    <Button onClick={()=>{}}  className="flex gap-2 bg-purple-600"><Printer size={15} />Export</Button>
                </div>
                <Separator />
                <div>
                    <RentsClient data={rents} />
                </div>
            </div>
        </div>
     );
}
 
export default RentsPage;