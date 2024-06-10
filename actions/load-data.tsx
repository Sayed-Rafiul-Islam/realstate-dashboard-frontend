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
import { getRents } from '@/redux/rents/rentsSlice'
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





const loadOrders = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const orders = [
        {
            _id : "1",
            name : "Owner 1",
            packageName : "Standard",
            amount : 9.99,
            gateway : "Bkash",
            date : "2024-04-04T00:00:00.000Z",
            status : "Pending",
            transactionId : 'geywqge762e32queg2e'
        },
        {
            _id : "2",
            name : "Owner 2",
            packageName : "Free",
            amount : 0,
            gateway : "None",
            date : "2024-04-05T00:00:00.000Z",
            status : "Paid",
            transactionId : 'geywqge762e32q22eg2e'
        },
        {
            _id : "3",
            name : "Owner 3",
            packageName : "Standard",
            amount : 9.99,
            gateway : "Cash",
            date : "2024-04-04T00:00:00.000Z",
            status : "Canceled",
            transactionId : 'geywfrf762e32queg2e'
        }
    ]
    dispatch(getOrders(orders))
}

const loadPackages = async (dispatch : any) => {
    const {data,status} = await api.get(`getPackages`,{validateStatus: () => true})
    dispatch(getPackages(data))
}

const loadOwnerPackages = async (dispatch : any) => {
    const {data,status} = await api.get(`getOwnerPackages`,{validateStatus: () => true})
    dispatch(getOwnerPackages(data))
}

const loadMessages = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const messages = [
        {
            _id : '1',
            name : 'Kaisel',
            email : "kaisel@gmail.com",
            phone : "01877622099",
            status : false,
            message : "loresafdolashfegfesbfjksdfjlksenflkseb"
        },
        {
            _id : "2",
            name : "Beru",
            email : "beru@gmail.com",
            phone : "01877622099",
            status : false,
            message : "loresafdolashfegfesbfjksdfjlksenflkseb"
        },
        {
            _id : "3",
            name : "Igris",
            email : "igris@gmail.com",
            phone : "01877622099",
            status : false,
            message : "loresafdolashfegfesbfjksdfjlksenflkseb"
        }
    ]
    dispatch(getmessages(messages))
}

const loadUsers = async (dispatch : any) => {
    const {data,status} = await api.get(`getUsers`,{validateStatus: () => true})
    dispatch(getAllUsers(data))
}

const loadOwners = async (dispatch : any) => {
    const {data,status} = await api.get(`getOwners`,{validateStatus: () => true})
    dispatch(getOwners(data))
}



// owner -----------------------------------------------------------------------------------


const loadProperties = async (dispatch : any) => {
    const {data,status} = await api.get(`getProperties`,{validateStatus: () => true})
    dispatch(getProperties(data))
}

const loadUnits = async (dispatch : any) => {
    const {data,status} = await api.get(`getUnits`,{validateStatus: () => true})
    dispatch(getUnits(data))
}

const loadTenants = async (dispatch : any) => {
    const {data,status} = await api.get(`getTenants`,{validateStatus: () => true})
    
    // const tenants = [
    //     {
    //         _id : '1',
    //         userId : '662774f150924ade5f6ce70f',
    //         ownerId : '662774a250924ade5f6ce70b',
    //         propertyId : '1',
    //         unitId : '3',
    //         name : 'Rodan',
    //         image : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1716987408/nmru6gcxjgjvczdf35e6.jpg',
    //         email : "rodan@gmail.com",
    //         phone : '01788544463',
    //         occupation : 'Student',
    //         startDate : '2024-05-02T17:34:59.911+00:00',
    //         endDate : '2024-010-02T17:34:59.911+00:00',
    //         dueDate : '2024-06-02T17:34:59.911+00:00',
    //         address : "1901 Thornridge Cir. Shiloh",
    //         city : "Toronto West",
    //         state : "Uttar Pradesh",
    //         country : "Canada",
    //         postalCode : "S0D 3C0",
    //         NID : 9978856723,
    //         due : 0,
    //         age : 25,
    //         familyMember : 5,
    //         status : true,
    //         personalDoc : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717305975/jeskckzoenydqsqykbf8.pdf',
    //         propertyDoc : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717305975/jeskckzoenydqsqykbf8.pdf'
    //     },
    //     {
    //         _id : '2',
    //         userId : '662774f150924ade5f6ce70f',
    //         ownerId : '662774a250924ade5f6ce70b',
    //         propertyId : '2',
    //         unitId : '2',
    //         name : 'Rafsan',
    //         image : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1716987408/nmru6gcxjgjvczdf35e6.jpg',
    //         email : "rafsan@gmail.com",
    //         phone : '01788544463',
    //         occupation : 'Shopkeeper',
    //         startDate : '2024-05-02T17:34:59.911+00:00',
    //         endDate : '2024-010-02T17:34:59.911+00:00',
    //         dueDate : '2024-06-02T17:34:59.911+00:00',
    //         address : "1901 Thornridge Cir. Shiloh",
    //         city : "Toronto West",
    //         state : "Uttar Pradesh",
    //         country : "Canada",
    //         postalCode : "S0D 3C0",
    //         NID : 9978856753,
    //         due : 20,
    //         age : 25,
    //         familyMember : 5,
    //         status : false,
    //         personalDoc : '',
    //         propertyDoc : ''
    //     },
    //     {
    //         _id : '3',
    //         userId : '662774f150924ade5f6ce70f',
    //         ownerId : '662774a250924ade5f6ce70b',
    //         propertyId : '1',
    //         unitId : '2',
    //         name : 'Godzilla',
    //         image : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1716987408/nmru6gcxjgjvczdf35e6.jpg',
    //         email : "godzilla@gmail.com",
    //         phone : '01788566463',
    //         occupation : 'Military',
    //         startDate : '2024-05-02T17:34:59.911+00:00',
    //         endDate : '2024-010-02T17:34:59.911+00:00',
    //         dueDate : '2024-06-02T17:34:59.911+00:00',
    //         address : "1901 Thornridge Cir. Shiloh",
    //         city : "Toronto West",
    //         state : "Uttar Pradesh",
    //         country : "Canada",
    //         postalCode : "S0D 3C0",
    //         NID : 9978855553,
    //         due : 0,
    //         age : 25,
    //         familyMember : 1,
    //         status : true,
    //         personalDoc : '',
    //         propertyDoc : ''
    //     }
    // ]

    dispatch(getTenants(data))
}

const loadInvoices = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const invoices = [
        {
            _id : '1',
            invoiceNo : 'CW10086675',
            prefix : 'INV',
            propertyId : '1',
            unitId : '3',
            month : 'April',
            dueDate : '2024-05-02T17:34:59.911+00:00',
            type : '3',
            description : 'alaba alaba alaba',
            status : 'Paid',
            amount : 20000,
            dateOfPayment : '2024-05-02T17:34:59.911+00:00',
            gateway : '1',
            transactionId : '00000',
            by : {
                role : 'owner',
                id : '662774a250924ade5f6ce70b'
            }
        },
        {
            _id : '2',
            invoiceNo : 'CW10086675',
            prefix : 'INV',
            propertyId : '1',
            unitId : '3',
            month : 'April',
            dueDate : '2024-05-02T17:34:59.911+00:00',
            type : '2',
            description : 'alaba alaba alaba',
            status : 'Pending',
            amount : 2000,
            dateOfPayment : '2024-05-02T17:34:59.911+00:00',
            gateway : '2',
            transactionId : '00000',
            by : {
                role : 'owner',
                id : '662774a250924ade5f6ce70b'
            }
        },
        {
            _id : '3',
            invoiceNo : 'CW10086675',
            prefix : 'INV',
            propertyId : '2',
            unitId : '3',
            month : 'April',
            dueDate : '2024-05-02T17:34:59.911+00:00',
            type : '2',
            description : 'alaba alaba alaba',
            status : 'Pending',
            amount : 2000,
            dateOfPayment : '2024-05-02T17:34:59.911+00:00',
            gateway : '2',
            transactionId : '00000',
            by : {
                role : 'owner',
                id : '662774a250924ade5f6ce70b'
            }
        },
        {
            _id : '4',
            invoiceNo : 'CW10086675',
            prefix : 'INV',
            propertyId : '1',
            unitId : '3',
            month : '',
            dueDate : '2024-05-02T17:34:59.911+00:00',
            type : '2',
            description : 'alaba alaba alaba',
            status : 'Pending',
            amount : 2000,
            dateOfPayment : '2024-05-02T17:34:59.911+00:00',
            gateway : '2',
            transactionId : '00000',
            by : {
                role : 'maintainer',
                id : '662774b650924ade5f6ce70d'
            },
            issue : '3'
        },
        {
            _id : '5',
            invoiceNo : 'CW10086675',
            prefix : 'INV',
            propertyId : '1',
            unitId : '2',
            month : '',
            dueDate : '2024-05-02T17:34:59.911+00:00',
            type : '1',
            description : 'alaba alaba alaba',
            status : 'Due',
            amount : 1500,
            dateOfPayment : '2024-05-02T17:34:59.911+00:00',
            gateway : '3',
            transactionId : '00000',
            by : {
                role : 'maintainer',
                id : '662774b650924ade5f6ce70d'
            },
            issue : '2'
        },
        {
            _id : '6',
            invoiceNo : 'CW10086675',
            prefix : 'INV',
            propertyId : '1',
            unitId : '2',
            month : '',
            dueDate : '2024-05-02T17:34:59.911+00:00',
            type : '1',
            issue : '1',
            description : 'alaba alaba alaba',
            status : 'Due',
            amount : 1500,
            dateOfPayment : '2024-05-02T17:34:59.911+00:00',
            gateway : '3',
            transactionId : '00000',
            by : {
                role : 'maintainer',
                id : '662774b650924ade5f6ce70d'
            }
        }
    ]
    dispatch(getInvoices(invoices))
}

const loadExpenses = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const expenses = [
        {
            _id : '1',
            name : 'Cracked Pavement in Parking Lot',
            propertyId : '1',
            unitId : '1',
            type : '1',
            amount : 14000,
            description : 'qwbdweuvfu',
            date : '2024-11-02T17:34:59.911+00:00',
            status : true
        },
        {
            _id : '2',
            name : 'Cracked Pavement in Parking Lot',
            propertyId : '1',
            unitId : '2',
            type : '2',
            amount : 1500,
            description : 'qwbdweuvfu',
            date : '2024-04-02T17:34:59.911+00:00',
            status : true
        },
        {
            _id : '6',
            name : 'Cracked Pavement in Parking Lot',
            propertyId : '1',
            unitId : '3',
            type : '1',
            amount : 2200,
            description : 'ANOTHER',
            date : '2024-05-02T17:34:59.911+00:00',
            status : false
        },
        {
            _id : '7',
            name : 'Cracked Pavement in Parking Lot',
            propertyId : '1',
            unitId : '3',
            type : '1',
            amount : 12500,
            description : 'qwbdweuvfu',
            date : '2024-01-02T17:34:59.911+00:00',
            status : true
        },
        {
            _id : '8',
            name : 'Cracked Pavement in Parking Lot',
            propertyId : '1',
            unitId : '3',
            type : '3',
            amount : 2500,
            description : 'qwbdweuvfu',
            date : '2024-08-02T17:34:59.911+00:00',
            status : false
        },
        {
            _id : '4',
            name : 'Cracked Pavement in Parking Lot',
            propertyId : '1',
            unitId : '1',
            type : '4',
            amount : 14000,
            description : 'qwbdweuvfu',
            date : '2024-05-02T17:34:59.911+00:00',
            status : false
        },
    ]
    dispatch(getExpenses(expenses))
}

const loadDocuments = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const documents = [
        {
            _id : '1',
            type : 'NID',
            tenantId : '1',
            docFront : building_1,
            docBack : tenant_1,
            status : "Accepted"
        },
        {
            _id : '2',
            type : 'NID',
            tenantId : '2',
            docFront : building_1,
            docBack : tenant_1,
            status : "Declined"
        },
        {
            _id : '3',
            type : 'NID',
            tenantId : '3',
            docFront : building_1,
            docBack : tenant_1,
            status : "In Progress"
        }
    ]
    dispatch(getDocuments(documents))
}

const loadRents = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const rents = [
        {
            _id : '1',
            dueDate : '2024-05-02T17:34:59.911+00:00',
            invoiceNo : 'CW10086615',
            propertyId : '1',
            unitId : '3',
            month : 'April',
            year : '2024',
            amount : 20000,
            status : 'Paid',
            description : 'alaba alaba alaba',
            dateOfPayment : '2024-05-02T17:34:59.911+00:00',
            gateway : 'Cash',
            transactionId : '00000',
            payment : 20000
        },
        {
            _id : '2',
            dueDate : '2024-03-02T17:34:59.911+00:00',
            invoiceNo : 'CW10086675',
            propertyId : '1',
            unitId : '2',
            month : 'May',
            year : '2024',
            amount : 15000,
            status : 'Paid',
            description : 'alaba alaba alaba',
            dateOfPayment : '2024-03-02T17:34:59.911+00:00',
            gateway : 'Cash',
            transactionId : '00000',
            payment : 15000
        },
        {
            _id : '3',
            dueDate : '2024-01-02T17:34:59.911+00:00',
            invoiceNo : 'CW10086680',
            propertyId : '1',
            unitId : '1',
            month : 'June',
            year : '2024',
            amount : 22000,
            status : 'Paid',
            description : 'alaba alaba alaba',
            dateOfPayment : '2024-01-02T17:34:59.911+00:00',
            gateway : 'Cash',
            transactionId : '00000',
            payment : 22000
        }
    ]
    dispatch(getRents(rents))
}

const loadMaintainers = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const maintainers = [
        {
            _id : '1',
            userId : '662774b650924ade5f6ce70d',
            propertyId : '1',
            unitId : '1',
            image : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1716987408/nmru6gcxjgjvczdf35e6.jpg',
            name : 'Rex',
            contactNo : '01788544463',
            email : "rex@gmail.com",
            type : "1",
            pendingRequest : 12,
            status : 'Available',
            address : "1901 Thornridge Cir. Shiloh",
            city : "Toronto West",
            state : "Uttar Pradesh",
            country : "Canada",
            postalCode : "S0D 3C0",
            age : 25,
            NID : 9978856723,
        },
        {
            _id : '2',
            userId : '2',
            propertyId : '1',
            unitId : '2',
            image : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1716987408/nmru6gcxjgjvczdf35e6.jpg',
            name : 'Max',
            contactNo : '01788544463',
            email : "max@gmail.com",
            type : "3",
            pendingRequest : 4,
            status : "Unavailable",
            address : "1901 Thornridge Cir. Shiloh",
            city : "Toronto West",
            state : "Uttar Pradesh",
            country : "Canada",
            postalCode : "S0D 3C0",
            age : 25,
            NID : 9978856722,
        },
        {
            _id : '3',
            userId : '3',
            propertyId : '1',
            unitId : '3',
            image : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1716987408/nmru6gcxjgjvczdf35e6.jpg',
            name : 'Alex',
            contactNo : '01788544463',
            email : "alex@gmail.com",
            type : "4",
            pendingRequest : 2,
            status : "Pending",
            address : "1901 Thornridge Cir. Shiloh",
            city : "Toronto West",
            state : "Uttar Pradesh",
            country : "Canada",
            postalCode : "S0D 3C0",
            age : 25,
            NID : 9978856724,
        }
    ]
    dispatch(getMaintainers(maintainers))
}

const loadMaintainanceRequests = async (dispatch : any) => {
    const {data,status} = await api.get(`getRequests`,{validateStatus: () => true})
    dispatch(getMaintainanceRequests(data))

}

const loadEarnings = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const earnings = [
        {
            _id : '1',
            invoiceNo : 'CW1242000',
            propertyId : '1',
            unitId : '1',
            date : '2024-05-02T17:34:59.911+00:00',
            amount : 20000,
            tax : 100,
        },
        {
            _id : '2',
            invoiceNo : 'CW1242001',
            propertyId : '1',
            unitId : '2',
            date : '2024-06-02T17:34:59.911+00:00',
            amount : 20000,
            tax : 100,
        },
        {
            _id : '3',
            invoiceNo : 'CW1242002',
            propertyId : '1',
            unitId : '3',
            date : '2024-04-02T17:34:59.911+00:00',
            amount : 20000,
            tax : 100,
        }
    ]
    dispatch(getEarnings(earnings))
}

const loadMonthlyRecords = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const monthly = [
        {
            _id : '1',
            month_year : 'April 2024',
            income : 80000,
            expense : 2000,
            net : 78000
        },
        {
            _id : '2',
            month_year : 'May 2024',
            income : 80000,
            expense : 82000,
            net : -2000
        },
        {
            _id : '3',
            month_year : 'June 2024',
            income : 80000,
            expense : 3000,
            net : 77000
        }
    ]
    dispatch(getMonthlyRecords(monthly))
}

const loadGateways = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const gateways = [
        {
            _id : '1',
            title : 'PayPal',
            slug : 'paypal',
            mode : 'Sandbox',
        },
        {
            _id : '2',
            title : 'Stripe',
            slug : 'stripe',
            mode : 'Sandbox',
        },
        {
            _id : '3',
            title : 'Sslcommerz',
            slug : 'sslcommerz',
            mode : 'Sandbox',
        },
        {
            _id : '4',
            title : 'Bank',
            slug : 'bank',
            mode : 'Live',
        },
        {
            _id : '5',
            title : 'Cash',
            slug : 'cash',
            mode : 'Live',
        },
       
    ]
    dispatch(getGateways(gateways))
}

const loadInvoiceTypes = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const types = [
        {
            _id : '1',
            title : 'Maintenance and repairs',
            tax : 1200,
        },
        {
            _id : '2',
            title : 'Utilities',
            tax : 1300,
        },
        {
            _id : '3',
            title : 'Taxes',
            tax : 1000,
        },
        {
            _id : '4',
            title : 'Rent',
            tax : 800,
        },
        {
            _id : '5',
            title : 'Bank fees',
            tax : 1800,
        },
       
    ]
    dispatch(getInvoiceTypes(types))
}

const loadExpenseTypes = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const types = [
        {
            _id : '1',
            title : 'Cleaning & Maintenance',
        },
        {
            _id : '2',
            title : 'Utilities',
        },
        {
            _id : '3',
            title : 'Rent',
        },
        {
            _id : '4',
            title : 'Texes',
        },
    ]
    dispatch(getExpenseTypes(types))
}

const loadMaintainanceTypes = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const types = [
        {
            _id : '1',
            type : 'Electrical problems',
            maintainer : 'Electritian',
            date : '2024-05-02T17:34:59.911+00:00'
        },
        {
            _id : '2',
            type : 'Pest infestations',
            maintainer : 'Pest Resolver',
            date : '2024-05-03T17:34:59.911+00:00'
        },
        {
            _id : '3',
            type : 'Plumbing problem',
            maintainer : 'Plumber',
            date : '2024-05-03T17:34:59.911+00:00'
        },
        {
            _id : '4',
            type : 'Structural Problem',
            maintainer : 'Structural Engineer',
            date : '2024-05-04T17:34:59.911+00:00'
        },
        {
            _id : '5',
            type : 'HVAC malfunctions',
            maintainer : 'HVAC Resolver',
            date : '2024-05-05T17:34:59.911+00:00'
        }
    ]
    dispatch(getMaintainanceTypes(types))
}

const loadNotifications = async (dispatch : any) => {
    const {data,status} = await api.get(`getNotifications`,{validateStatus: () => true})
    // const notifications = [
    //     {
    //         _id : '1',
    //         propertyId : '1',
    //         unitId : "1",
    //         issue : "New Invoice",
    //         body : 'Package Assign Successfully',
    //         date : '2024-05-02T17:34:59.911+00:00'
    //     },
    //     {
    //         _id : '2',
    //         propertyId : '1',
    //         unitId : "2",
    //         issue : "New Invoice",
    //         body : 'Package Assign Successfully',
    //         date : '2024-07-02T17:34:59.911+00:00'
    //     },
    //     {
    //         _id : '3',
    //         propertyId : '1',
    //         unitId : "3",
    //         issue : "New Invoice",
    //         body : 'Package Assign Successfully',
    //         date : '2024-06-02T17:34:59.911+00:00'
    //     }
    // ]
    dispatch(getNotifications(data))
}

const loadTenanrDocuments = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const documents = [
        {
            _id : '1',
            type : 'NID',
            tenantName : 'Beru',
            tenantId : '1',
            propertyId : '1',
            unitId : '1',
            document : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717517543/zoykcql4meeoyykuq2vw.pdf',
            docFront : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717517597/gm1ost9xieovxsuhu9qv.jpg',
            docBack : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717517597/gm1ost9xieovxsuhu9qv.jpg',
            status : "Accepted"
        },
        {
            _id : '2',
            type : 'NID',
            tenantName : 'Nahid',
            tenantId : '1',
            propertyId : '1',
            unitId : '2',
            document : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717517543/zoykcql4meeoyykuq2vw.pdf',
            docFront : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717517597/gm1ost9xieovxsuhu9qv.jpg',
            docBack : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717517597/gm1ost9xieovxsuhu9qv.jpg',
            status : "Declined"
        },
        {
            _id : '3',
            type : 'NID',
            tenantName : 'Conquest',
            tenantId : '1',
            propertyId : '1',
            unitId : '3',
            document : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717517543/zoykcql4meeoyykuq2vw.pdf',
            docFront : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717517597/gm1ost9xieovxsuhu9qv.jpg',
            docBack : 'https://res.cloudinary.com/dw0fuijfs/image/upload/v1717517597/gm1ost9xieovxsuhu9qv.jpg',
            status : "In Progress"
        }
    ]
    dispatch(getTenantDocuments(documents))
}

export function LoadData() {

    const dispatch = useDispatch()

    loadUsers(dispatch)
    loadOrders()
    loadPackages(dispatch)
    loadOwnerPackages(dispatch)
    loadMessages()
    loadOwners(dispatch)


    loadProperties(dispatch)
    loadUnits(dispatch)
    loadTenants(dispatch)
    loadInvoices()
    loadExpenses()
    loadDocuments()
    loadRents()
    loadMaintainers()
    loadMaintainanceRequests(dispatch)
    loadEarnings()
    loadMonthlyRecords()
    loadGateways()
    loadInvoiceTypes()
    loadExpenseTypes()
    loadMaintainanceTypes()
    loadNotifications(dispatch)
    loadTenanrDocuments()
    
      
}