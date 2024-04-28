"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import api from "./api"
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "@/redux/auth/authSlice"
import { getOrders } from "@/redux/orders/ordersSlice"
import { getPackages } from "@/redux/packages/packagesSlice"


export default async function LoadData() {


    loadOrders()
    loadPackages()
  
      
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
            status : "Pending"
        },
        {
            _id : "2",
            name : "Owner 2",
            packageName : "Free",
            amount : 0,
            gateway : "None",
            date : "2024-04-05T00:00:00.000Z",
            status : "Paid"
        },
        {
            _id : "3",
            name : "Owner 3",
            packageName : "Standard",
            amount : 9.99,
            gateway : "Cash",
            date : "2024-04-04T00:00:00.000Z",
            status : "Canceled"
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