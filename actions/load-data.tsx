"use client"

import building_1 from '@/images/buildings/b1.jpg'
import tenant_1 from '@/images/tenants/tenant_1.jpeg'


import { useDispatch } from "react-redux"
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

const loadPackages = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const packages = [
        {
            _id : "1",
            label : "Standard",
            monthlyPrice : 9.99,
            yearlyPrice : 99.99,
            maxProperty : 4,
            maxUnit : 8,
            status : true,
            trial : false
        },
        {
            _id : "2",
            label : "Free",
            monthlyPrice : 0,
            yearlyPrice : 0,
            maxProperty : 1,
            maxUnit : 2,
            status : true,
            trial : true
        },
        {
            _id : "3",
            label : "Standard",
            monthlyPrice : 9.99,
            yearlyPrice : 99.99,
            maxProperty : 4,
            maxUnit : 8,
            status : true,
            trial : false
        }
    ]
    dispatch(getPackages(packages))
}

const loadOwnerPackages = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const ownerPackages = [
        {
            _id : "1",
            name : "Ragib",
            email : "ragib@gmail.com",
            packageName : "Standard",
            gateway : "Cash",
            startDate : "2024-02-04T00:00:00.000Z",
            endDate : "2025-02-04T00:00:00.000Z",
            paymentStatus : "Canceled",
            status : false
        },
        {
            _id : "2",
            name : "Beru",
            email : "beru@gmail.com",
            packageName : "free",
            gateway : "Cash",
            startDate : "2024-02-04T00:00:00.000Z",
            endDate : "2025-02-04T00:00:00.000Z",
            paymentStatus : "Paid",
            status : true
        },
        {
            _id : "3",
            name : "Igris",
            email : "igris@gmail.com",
            packageName : "Premeum",
            gateway : "Cash",
            startDate : "2024-02-04T00:00:00.000Z",
            endDate : "2025-02-04T00:00:00.000Z",
            paymentStatus : "Pending",
            status : false
        }
    ]
    dispatch(getOwnerPackages(ownerPackages))
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

const loadOwners = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const owners = [
        {
            _id : '1',
            name : 'Kaisel',
            email : "kaisel@gmail.com",
            contactNo : "01877622099",
            status : false,
        },
        {
            _id : "2",
            name : "Beru",
            email : "beru@gmail.com",
            contactNo : "01877622099",
            status : true,
        },
        {
            _id : "3",
            name : "Igris",
            email : "igris@gmail.com",
            contactNo : "01877622099",
            status : false,
        }
    ]
    dispatch(getOwners(owners))
}



// owner -----------------------------------------------------------------------------------


const loadProperties = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const properties = [
        {
            _id : '1',
            name : 'The Ivy Residences',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            location : "Kenia, Alaska, United States",
            coverImage : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1715582360/etww2t2ztuariwws6su3.jpg",
            unitCount : 3,
            rooms : 16,
            available : 2,
            tenants : 2,
            deposit : 100,
            lateFee : 2,
            rent : 15000,
            rentType : "monthly",
            city : 'city',
            state : 'state',
            country : 'country',
            postCode : '5400'
        },
        {
            _id : '2',
            name : 'The Ivy Residences',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            location : "Kenia, Alaska, United States",
            coverImage : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1715582360/etww2t2ztuariwws6su3.jpg",
            unitCount : 8,
            rooms : 16,
            available : 2,
            tenants : 2,
            deposit : 100,
            lateFee : 2,
            rent : 15000,
            rentType : "monthly",
            city : 'city',
            state : 'state',
            country : 'country',
            postCode : '5400'
        },
        {
            _id : '3',
            name : 'The Ivy Residences',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            location : "Kenia, Alaska, United States",
            coverImage : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1715582360/etww2t2ztuariwws6su3.jpg",
            unitCount : 8,
            rooms : 16,
            available : 2,
            tenants : 2,
            deposit : 100,
            lateFee : 2,
            rent : 15000,
            rentType : "monthly",
            city : 'city',
            state : 'state',
            country : 'country',
            postCode : '5400'
        },
        {
            _id : '4',
            name : 'The Ivy Residences',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            location : "Kenia, Alaska, United States",
            coverImage : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1715582360/etww2t2ztuariwws6su3.jpg",
            unitCount : 8,
            rooms : 16,
            available : 2,
            tenants : 2,
            deposit : 100,
            lateFee : 2,
            rent : 15000,
            rentType : "monthly",
            city : 'city',
            state : 'state',
            country : 'country',
            postCode : '5400'

        }
    ]
    dispatch(getProperties(properties))
}

const loadUnits = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const units = [
        {
            _id : '1',
            propertyId : '1',
            image : '',
            name : 'Unit 1',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            condition : "Good",
            tenant : '',
            squareFeet : 200,
            bedrooms : 3,
            washrooms : 2,
            kitchen : 1,
            rent : 50
        },
        {
            _id : '2',
            propertyId : '1',
            image : '',
            name : 'Unit 2',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            condition : "Good",
            tenant : 'Ivar',
            squareFeet : 300,
            bedrooms : 3,
            washrooms : 2,
            kitchen : 1,
            rent : 50
        },
        {
            _id : '3',
            propertyId : '1',
            image : '',
            name : 'Unit 3',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            condition : "Good",
            tenant : '',
            squareFeet : 100,
            bedrooms : 1,
            washrooms : 1,
            kitchen : 1,
            rent : 50
        }
    ]
    dispatch(getUnits(units))
}

const loadTenants = async () => {
    // const {data,status} = await api.get(`varify?accessToken`,{validateStatus: () => true})
    
    const dispatch = useDispatch()
    const tenants = [
        {
            _id : '1',
            propertyId : '1',
            unitId : '3',
            name : 'Rodan',
            image : tenant_1,
            email : "rodan@gmail.com",
            phone : '01788544463',
            occupation : 'Student',
            startDate : '2024-05-02T17:34:59.911+00:00',
            dueDate : '2024-06-02T17:34:59.911+00:00',
            address : "1901 Thornridge Cir. Shiloh",
            city : "Toronto West",
            state : "Uttar Pradesh",
            country : "Canada",
            postalCode : "S0D 3C0",
            NID : 9978856723,
            due : 0,
            age : 25,
            familyMember : 5,
            status : true,
        },
        {
            _id : '2',
            propertyId : '2',
            unitId : '2',
            name : 'Rafsan',
            image : tenant_1,
            email : "rafsan@gmail.com",
            phone : '01788544463',
            occupation : 'Shopkeeper',
            startDate : '2024-05-02T17:34:59.911+00:00',
            dueDate : '2024-06-02T17:34:59.911+00:00',
            address : "1901 Thornridge Cir. Shiloh",
            city : "Toronto West",
            state : "Uttar Pradesh",
            country : "Canada",
            postalCode : "S0D 3C0",
            NID : 9978856753,
            due : 20,
            age : 25,
            familyMember : 5,
            status : false,
        },
        {
            _id : '3',
            propertyId : '1',
            unitId : '2',
            name : 'Godzilla',
            image : tenant_1,
            email : "godzilla@gmail.com",
            phone : '01788566463',
            occupation : 'Military',
            startDate : '2024-05-02T17:34:59.911+00:00',
            dueDate : '2024-06-02T17:34:59.911+00:00',
            address : "1901 Thornridge Cir. Shiloh",
            city : "Toronto West",
            state : "Uttar Pradesh",
            country : "Canada",
            postalCode : "S0D 3C0",
            NID : 9978855553,
            due : 0,
            age : 25,
            familyMember : 1,
            status : true
        }
    ]
    dispatch(getTenants(tenants))
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
            type : 'Rent',
            description : 'alaba alaba alaba',
            status : 'Paid',
            amount : 20000,
            dateOfPayment : '2024-05-02T17:34:59.911+00:00',
            gateway : 'Cash',
            transactionId : '00000',
            payment : 20000
        },
        {
            _id : '2',
            invoiceNo : 'CW10086675',
            prefix : 'INV',
            propertyId : '2',
            unitId : '2',
            month : 'April',
            dueDate : '2024-05-02T17:34:59.911+00:00',
            type : 'Maintainance',
            description : 'alaba alaba alaba',
            status : 'Pending',
            amount : 2000,
            dateOfPayment : '2024-05-02T17:34:59.911+00:00',
            gateway : 'Bkash',
            transactionId : '00000',
            payment : 2000
        },
        {
            _id : '3',
            invoiceNo : 'CW10086675',
            prefix : 'INV',
            propertyId : '1',
            unitId : '2',
            month : 'April',
            dueDate : '2024-05-02T17:34:59.911+00:00',
            type : 'Utility',
            description : 'alaba alaba alaba',
            status : 'Due',
            amount : 1500,
            dateOfPayment : '2024-05-02T17:34:59.911+00:00',
            gateway : 'Bkash',
            transactionId : '00000',
            payment : 1500
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
            type : 'Cleaning & Maintenance',
            amount : 3500,
            description : 'qwbdweuvfu'
        },
        {
            _id : '2',
            name : 'Cracked Pavement in Parking Lot',
            propertyId : '1',
            unitId : '1',
            type : 'Cleaning & Maintenance',
            amount : 3500,
            description : 'qwbdweuvfu'
        },
        {
            _id : '3',
            name : 'Cracked Pavement in Parking Lot',
            propertyId : '1',
            unitId : '1',
            type : 'Cleaning & Maintenance',
            amount : 3500,
            description : 'qwbdweuvfu'
        }
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

export default async function LoadData() {


    loadOrders()
    loadPackages()
    loadOwnerPackages()
    loadMessages()
    loadOwners()


    loadProperties()
    loadUnits()
    loadTenants()
    loadInvoices()
    loadExpenses()
    loadDocuments()
      
}