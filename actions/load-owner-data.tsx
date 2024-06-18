"use client"

import { useDispatch } from "react-redux"
import { getRents } from '@/redux/data/owner/rentsSlice'
import api from './api'
import { OwnerProps } from '@/types'
import { useEffect, useState } from 'react'
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




export const LoadOwnerData = async (_id : string) => {

    const dispatch = useDispatch()
    const {data,status} = await api.get(`getOwners`,{validateStatus: () => true})
    const owner = data.filter((item : OwnerProps) => item.user._id === _id)[0]
    dispatch(getOwnerInfo(owner))
    if (owner) {
            const properties = await api.get(`getOwnerProperties?id=${owner._id}`,{validateStatus: () => true})
            const units = await api.get(`getOwnerUnits?id=${owner._id}`,{validateStatus: () => true})
            const maintainers = await api.get(`getOwnerMaintainers?id=${owner._id}`,{validateStatus: () => true})
            const maintainanceTypes = await api.get(`getMaintainaceType?id=${owner._id}`,{validateStatus: () => true})
            const expenseTypes = await api.get(`getOwnerExpenseType?ownerId=${owner._id}`,{validateStatus: () => true})
            const invoiceTypes = await api.get(`getOwnerInvoiceType?ownerId=${owner._id}`,{validateStatus: () => true})
            const gateways = await api.get(`getOwnerGateway?ownerId=${owner._id}`,{validateStatus: () => true})
            const tenants = await api.get(`getOwnerTenants?id=${owner._id}`,{validateStatus: () => true})
            const requests = await api.get(`getOwnerRequests?ownerId=${owner._id}`,{validateStatus: () => true})
            const invoices = await api.get(`getOwnerInvoice?ownerId=${owner._id}`,{validateStatus: () => true})
            const rents = await api.get(`getRents?ownerId=${owner._id}`,{validateStatus: () => true})
            const expenses = await api.get(`getExpense?ownerId=${owner._id}`,{validateStatus: () => true})

            
            dispatch(getOwnerMaintainanceRequests(requests.data))
            dispatch(getOwnerProperties(properties.data))
            dispatch(getOwnerUnits(units.data))
            dispatch(getOwnerTenants(tenants.data))
            dispatch(getOwnerMaintainanceTypes(maintainanceTypes.data))
            dispatch(getOwnerExpenseTypes(expenseTypes.data))
            dispatch(getOwnerInvoiceTypes(invoiceTypes.data))
            dispatch(getOwnerGateways(gateways.data))
            dispatch(getOwnerMaintainers(maintainers.data))
            dispatch(getOwnerInvoices(invoices.data))
            dispatch(getRents(rents.data))
            dispatch(getOwnerExpenses(expenses.data))
        }
    
}

