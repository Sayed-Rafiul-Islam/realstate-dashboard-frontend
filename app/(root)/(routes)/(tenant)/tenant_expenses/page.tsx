"use client"

import { useSelector } from "react-redux";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ExpenseTypesReducerProps, ExpensesReducerProps, PropertiesReducerProps, UnitsReducerProps } from "@/types";
import { ExpensesClient } from "./components/client";
import { format } from "date-fns";


const TenantExpensesPage = () => {
    // const router = useRouter()
    // const pathname = usePathname()
    // const {expenses} = useSelector(({expensesReducer} : ExpensesReducerProps) => expensesReducer)

    // const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    // const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    // const {expenseTypes} = useSelector(({expenseTypesReducer} : ExpenseTypesReducerProps) => expenseTypesReducer)

    // const formattedExpenses = expenses.map((
    //     {
    //         _id,
    //         propertyId,
    //         unitId,
    //         type,
    //         amount,
    //         description,
    //         date,
    //         status
    //     }) => {
    //         const property = properties.filter((item)=> item._id === propertyId)[0]
    //         const unit = units.filter((item)=> item._id === unitId)[0]
    //         const expense = expenseTypes.filter((item)=> item._id === type)[0]
    //         return {
    //             _id,
    //             property_unit : `${property.name}/${unit.name}`,
    //             typeName : expense?.title,
    //             typeId : type,
    //             description,
    //             amount : `BDT ${amount}`,
    //             date : format(date,"MMMM do, yyyy"),
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
                                Expenses
                            </BreadcrumbPage>
                        </BreadcrumbList>
                    </Breadcrumb>
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Expenses</h1>
                </div>
                <Separator />
                {/* <ExpensesClient data={formattedExpenses} /> */}
            </div>
        </div>
     );
}
 
export default TenantExpensesPage;