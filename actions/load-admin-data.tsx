"use client"

import building_1 from '@/images/buildings/b1.jpg'
import tenant_1 from '@/images/tenants/tenant_1.jpeg'


import { useDispatch, useSelector } from "react-redux"
import { getOrders } from "@/redux/orders/ordersSlice"
import { getPackages } from "@/redux/packages/packagesSlice"
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
import { getAllOwnerPackages } from '@/redux/ownerPackages/ownerPackagesSlice'
import { getAdminMessages, getAdminReceivedMessages } from '@/redux/data/admin/messagesSlice'





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
    dispatch(getAllOwnerPackages(data))
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
            propertyId : '6666b7fc10f594ac24910069',
            unitId : '6666b7fd10f594ac24910071',
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
            propertyId : '6666b7fc10f594ac24910069',
            unitId : '6666b7fd10f594ac2491006f',
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
            propertyId : '6666b7fc10f594ac24910069',
            unitId : '6666b7fd10f594ac2491006d',
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

const loadMaintainers = async (dispatch : any) => {
    const {data,status} = await api.get(`getMaintainers`,{validateStatus: () => true})
    dispatch(getMaintainers(data))
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
    dispatch(getNotifications(data))
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

export const LoadAdminData = async (_id : string) => {

    const dispatch = useDispatch()

   
  

        const orders = await api.get(`getOrders`,{validateStatus: () => true})
        const packages = await api.get(`getPackages`,{validateStatus: () => true})
        const allOwnerPackages = await api.get(`getAllOwnerPackages`,{validateStatus: () => true})
        const sent = await api.get(`getSentMessages?id=${_id}`,{validateStatus: () => true})
        const messages = await api.get(`getMessages?id=${_id}`,{validateStatus: () => true})
       
        const properties = await api.get(`getProperties`,{validateStatus: () => true})
        const units = await api.get(`getUnits`,{validateStatus: () => true})
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
        const rents = [
            {
                _id : '1',
                dueDate : '2024-05-02T17:34:59.911+00:00',
                invoiceNo : 'CW10086615',
                propertyId : '6666b7fc10f594ac24910069',
                unitId : '6666b7fd10f594ac24910071',
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
                propertyId : '6666b7fc10f594ac24910069',
                unitId : '6666b7fd10f594ac2491006f',
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
                propertyId : '6666b7fc10f594ac24910069',
                unitId : '6666b7fd10f594ac2491006d',
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
        const requests = await api.get(`getRequests`,{validateStatus: () => true})
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
        const invoiceTypes = [
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
        const expenseTypes = [
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
        const maintainanceTypes = [
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
        const notifications = await api.get(`getNotifications`,{validateStatus: () => true})
        const tenantDocuments = [
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
        
        
        dispatch(getOrders(orders.data))
        dispatch(getPackages(packages.data))
        dispatch(getAllOwnerPackages(allOwnerPackages.data))
        dispatch(getAdminMessages(sent.data))
        dispatch(getAdminReceivedMessages(messages.data))
        dispatch(getProperties(properties.data))
        dispatch(getUnits(units.data))
        dispatch(getInvoices(invoices))
        dispatch(getExpenses(expenses))
        dispatch(getDocuments(documents))
        dispatch(getRents(rents))
        dispatch(getMaintainanceRequests(requests.data))
        dispatch(getEarnings(earnings))
        dispatch(getMonthlyRecords(monthly))
        dispatch(getGateways(gateways))
        dispatch(getInvoiceTypes(invoiceTypes))
        dispatch(getExpenseTypes(expenseTypes))
        dispatch(getMaintainanceTypes(maintainanceTypes))
        dispatch(getNotifications(notifications.data))
        dispatch(getTenantDocuments(tenantDocuments))

        // loadUsers(dispatch)
        // loadOwners(dispatch)
        // loadTenants(dispatch)
        // loadMaintainers(dispatch)
        
        // loadOrders()
        // loadPackages(dispatch)
        // loadOwnerPackages(dispatch)
        // loadMessages()


        // loadProperties(dispatch)
        // loadUnits(dispatch)
        // loadInvoices()
        // loadExpenses()
        // loadDocuments()
        // loadRents()
        // loadMaintainanceRequests(dispatch)
        // loadEarnings()
        // loadMonthlyRecords()
        // loadGateways()
        // loadInvoiceTypes()
        // loadExpenseTypes()
        // loadMaintainanceTypes()
        // loadNotifications(dispatch)
        // loadTenanrDocuments()
    
    
      
}