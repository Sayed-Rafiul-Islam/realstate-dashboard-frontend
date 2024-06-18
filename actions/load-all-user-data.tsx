"use client"

import building_1 from '@/images/buildings/b1.jpg'
import tenant_1 from '@/images/tenants/tenant_1.jpeg'


import { useDispatch, useSelector } from "react-redux"
import { getOrders } from "@/redux/orders/ordersSlice"
import { getPackages } from "@/redux/packages/packagesSlice"
import { getOwnerPackages } from "@/redux/ownerPackages/ownerPackagesSlice"
import { getmessages } from "@/redux/messages/messagesSlice"
import { getOwners } from "@/redux/owners/ownersSlice"
import { getProperties } from "@/redux/properties/propertiesSlice"
import { getUnits } from '@/redux/units/unitsSlice'
import { getTenants } from '@/redux/tenants/tenantsSlice'
import { getInvoices } from '@/redux/invoices/invoicesSlice'
import { getExpenses } from '@/redux/expenses/expensesSlice'
import { getDocuments } from '@/redux/documents/documentsSlice'
import { getRents } from '@/redux/data/owner/rentsSlice'
import { getMaintainers } from '@/redux/maintainers/maintainersSlice'
import { getMaintainanceRequests } from '@/redux/maintainanceRequests/maintainanceRequestsSlice'
import { getEarnings } from '@/redux/report/earningsSlice'
import { getMonthlyRecords } from '@/redux/report/monthlyRecordsSlice'
import { getGateways } from '@/redux/settings/gatewaySlice'
import { getInvoiceTypes } from '@/redux/settings/invoiceTypesSlice'
import { getExpenseTypes } from '@/redux/settings/expenseTypesSlice'
import { getMaintainanceTypes } from '@/redux/settings/maintainanceTypesSlice'
import api from './api'
import { getNotifications } from '@/redux/report/notificationsSlice'
import { getTenantDocuments } from '@/redux/documents/tenantDocumentsSlice'
import { getAllUsers } from '@/redux/users/usersSlice'
import { OwnerInfoReducerProps, OwnerProps } from '@/types'
import { useEffect, useState } from 'react'
import { getOwnerProperties } from '@/redux/data/owner/propertiesSlice'
import { getOwnerUnits } from '@/redux/data/owner/unitsSlice'


const loadUsers = async (dispatch : any) => {
    const {data,status} = await api.get(`getUsers`,{validateStatus: () => true})
    dispatch(getAllUsers(data))
}

const loadOwners = async (dispatch : any) => {
    const {data,status} = await api.get(`getOwners`,{validateStatus: () => true})
    dispatch(getOwners(data))
}


const loadTenants = async (dispatch : any) => {
    const {data,status} = await api.get(`getTenants`,{validateStatus: () => true})
    dispatch(getTenants(data))
}

const loadMaintainers = async (dispatch : any) => {
    const {data,status} = await api.get(`getMaintainers`,{validateStatus: () => true})
    dispatch(getMaintainers(data))
}



export function LoadAllUsersData() {

    const dispatch = useDispatch()
    
        loadUsers(dispatch)
        loadOwners(dispatch)
        loadTenants(dispatch)
        loadMaintainers(dispatch)   
}

