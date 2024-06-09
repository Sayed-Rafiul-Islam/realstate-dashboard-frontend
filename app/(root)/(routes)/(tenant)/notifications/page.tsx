"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {NotificationsReducerProps, PropertiesReducerProps, TenantInfoReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { Printer } from "lucide-react";
import { NotificationsClient } from "./components/client";


const NotificationPage = () => {

    const router = useRouter()
    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo
    const {notifications} = useSelector(({notificationsReducer} : NotificationsReducerProps) => notificationsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)

    const thisTenantNotification = notifications.filter(({propertyId,unitId})=>propertyId === tenant.property._id && unitId === tenant.unit._id)
    const formattedNotifications = thisTenantNotification.map((
        {
            _id,
            propertyId,
            unitId,
            issue,
            body,
            date
        }) => {
            const property = properties.filter((item)=> item._id === propertyId)[0]
            const unit = units.filter((item)=> item._id === unitId)[0]
            const tenant = tenants.filter((item)=> item.unit._id === unitId && item.property._id === propertyId)[0]
            return {
                _id,
                date,
                tenantName : tenant ? tenant.name : 'No Tenant',
                tenant,
                property,
                unit,
                issue,
                body
            }
    }).reverse()

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">Notifications</h1>
                </div>
                <Separator />
                <div>
                    <NotificationsClient data={formattedNotifications} />
                </div>
            </div>
        </div>
     );
}
 
export default NotificationPage;