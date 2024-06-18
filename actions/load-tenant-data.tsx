"use client"

import { useDispatch } from "react-redux"
import { getRents } from '@/redux/data/owner/rentsSlice'
import api from './api'
import { OwnerProps, TenantProps } from '@/types'
import { getOwnerProperties } from '@/redux/data/owner/propertiesSlice'
import { getOwnerUnits } from '@/redux/data/owner/unitsSlice'
import { getOwnerMaintainanceRequests } from '@/redux/data/owner/maintainanceRequestsSlice'
import { getOwnerTenants } from '@/redux/data/owner/tenantsSlice'
import { getOwnerMaintainanceTypes } from '@/redux/data/owner/settings/maintainanceTypesSlice'
import { getOwnerExpenseTypes } from '@/redux/data/owner/settings/expenseTypesSlice'
import { getOwnerInvoiceTypes } from '@/redux/data/owner/settings/invoiceTypesSlice'
import { getOwnerGateways } from '@/redux/data/owner/settings/gatewaySlice'
import { getOwnerMaintainers } from '@/redux/data/owner/maintainersSlice'
import { getOwnerInvoices } from '@/redux/data/owner/invoicesSlice'
import { getOwnerExpenses } from '@/redux/data/owner/expensesSlice'
import { getOwnerInfo } from "@/redux/info/ownerInfoSlice"
import { getTenantInfo } from "@/redux/info/tenantInfoSlice"
import { getTenantMaintainanceRequests } from "@/redux/data/tenant/maintainanceRequestsSlice"
import { getTenantInvoices } from "@/redux/data/tenant/invoicesSlice"
import { getTenantRents } from "@/redux/data/tenant/rentsSlice"




export const LoadTenantData = async (_id : string) => {

    
    
    if (_id ) {
      
        const {data,status} = await api.get(`getTenant?_id=${_id}`,{validateStatus: () => true})
    // const tenant = await data.filter((item : TenantProps) => item.user._id === _id)[0]
    // dispatch(getTenantInfo(tenant))
    return data
        // if (status === 200 && data) {
        //     console.log(data)
        //     const requests = (await api.get(`getTenantRequests?propertyId=${data.property._id}&unitId=${data.unit._id}`,{validateStatus: () => true})).data
        //     const maintainanceTypes = (await api.get(`getMaintainaceType?id=${data.owner._id}`,{validateStatus: () => true})).data
        //     const invoices = (await api.get(`getTenantInvoices?property=${data.property._id}&unit=${data.unit._id}`,{validateStatus: () => true})).data
        //     const invoiceTypes = (await api.get(`getOwnerInvoiceType?ownerId=${data.owner._id}`,{validateStatus: () => true})).data
        //     const rents = (await api.get(`geTenantRents?tenantId=${data._id}`,{validateStatus: () => true})).data
        //     return {data,requests,maintainanceTypes,invoices,invoiceTypes, rents}
        // }
    }
        
}

