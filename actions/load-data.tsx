"use client"

import building_1 from '@/images/buildings/b1.jpg'
import { useDispatch } from "react-redux"
import { getOrders } from "@/redux/orders/ordersSlice"
import { getPackages } from "@/redux/packages/packagesSlice"
import { getOwnerPackages } from "@/redux/ownerPackages/ownerPackagesSlice"
import { getmessages } from "@/redux/messages/messagesSlice"
import { getOwners } from "@/redux/owners/ownersSlice"
import { getProperties } from "@/redux/properties/propertiesSlice"
import { getUnits } from '@/redux/units/unitsSlice'


export default async function LoadData() {


    loadOrders()
    loadPackages()
    loadOwnerPackages()
    loadMessages()
    loadOwners()


    loadProperties()
    loadUnits()
  
      
}

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
            coverImage : building_1,
            unitCount : 8,
            rooms : 16,
            available : 2,
            tenants : 2,
            rent : 50,
            deposit : 100,
            lateFee : 2,
        },
        {
            _id : '2',
            name : 'The Ivy Residences',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            location : "Kenia, Alaska, United States",
            coverImage : building_1,
            unitCount : 8,
            rooms : 16,
            available : 2,
            tenants : 2,
            rent : 50,
            deposit : 100,
            lateFee : 2,
        },
        {
            _id : '3',
            name : 'The Ivy Residences',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            location : "Kenia, Alaska, United States",
            coverImage : building_1,
            unitCount : 8,
            rooms : 16,
            available : 2,
            tenants : 2,
            rent : 50,
            deposit : 100,
            lateFee : 2,
        },
        {
            _id : '4',
            name : 'The Ivy Residences',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            location : "Kenia, Alaska, United States",
            coverImage : building_1,
            unitCount : 8,
            rooms : 16,
            available : 2,
            tenants : 2,
            rent : 50,
            deposit : 100,
            lateFee : 2,
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
            name : 'Unit 1',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            condition : "Good",
            squareFeet : 200,
            bedrooms : 3,
            washrooms : 2,
            kitchen : 1
        },
        {
            _id : '2',
            propertyId : '1',
            name : 'Unit 2',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            condition : "Good",
            squareFeet : 300,
            bedrooms : 3,
            washrooms : 2,
            kitchen : 1
        },
        {
            _id : '3',
            propertyId : '1',
            name : 'Unit 3',
            description : `The Ivy Resided, located in the USA, is a small residential property with only 2 units. Given its limited size, it is likely a duplex, townhouse, or small apartment building. With only two units, The Ivy Resided may offer a more private and intimate living experience compared to larger properties. Depending on the location and design, the two units may offer spacious living areas, modern amenities, and high-end finishes. The property's location in the USA, however, does not specify the exact location, which could impact the availability of services and amenities nearby. A more specific location would provide a better idea of the surrounding area and what The Ivy Resided has to offer.`,
            condition : "Good",
            squareFeet : 100,
            bedrooms : 1,
            washrooms : 1,
            kitchen : 1
        }
    ]
    dispatch(getUnits(units))
}