import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"
import { OrderProps } from "@/types"

const ordersJson = typeof window !== "undefined" && localStorage.getItem("orders")

const initialState = {
    orders : ordersJson ? JSON.parse(ordersJson) : [],
}

// export const getAllOrders = createAsyncThunk("getAllOrders", async () => {
//     // const {data,status} = await axios(`${process.env.NEXT_PUBLIC_API}/getUsers`)
//     const data = [
//         {
//             _id : "1",
//             name : "Owner 1",
//             packageName : "Standard",
//             amount : 9.99,
//             gateway : "Bkash",
//             date : "2024-04-04T00:00:00.000Z",
//             status : "Pending"
//         },
//         {
//             _id : "2",
//             name : "Owner 2",
//             packageName : "Free",
//             amount : 0,
//             gateway : "None",
//             date : "2024-04-05T00:00:00.000Z",
//             status : "Paid"
//         },
//         {
//             _id : "3",
//             name : "Owner 3",
//             packageName : "Standard",
//             amount : 9.99,
//             gateway : "Cash",
//             date : "2024-04-04T00:00:00.000Z",
//             status : "Canceled"
//         }
//     ]

//     return data
// })

const orderSlice = createSlice({
    name : "orders",
    initialState,
    reducers : {
        getOrders : (state, {payload}) => {
            state.orders = payload
        }
    }
})

export const {getOrders} = orderSlice.actions
// export const getAllOrders = (state : any) =>state.orders.orders
export default orderSlice.reducer