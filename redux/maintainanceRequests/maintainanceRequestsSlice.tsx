import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const maintainanceRequestsJson = typeof window !== "undefined" && localStorage.getItem("maintainanceRequests")

const initialState = {
    maintainanceRequests : maintainanceRequestsJson ? JSON.parse(maintainanceRequestsJson) : [],
}



const maintainanceRequestsSlice = createSlice({
    name : "maintainanceRequests",
    initialState,
    reducers : {
        getMaintainanceRequests : (state, {payload}) => {
            state.maintainanceRequests = payload
            localStorage.removeItem("maintainanceRequests")
            localStorage.setItem("maintainanceRequests", JSON.stringify(state.maintainanceRequests))
        },
        // updatemaintainanceRequeststatus : (state, {payload}) => {
        //     const temp = state.maintainanceRequests.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.maintainanceRequests = temp
        //     localStorage.removeItem("maintainanceRequests")
        //     localStorage.setItem("maintainanceRequests", JSON.stringify(state.maintainanceRequests))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.maintainanceRequests.push(payload)
        //     console.log(state.maintainanceRequests)
        //     localStorage.removeItem("maintainanceRequests")
        //     localStorage.setItem("maintainanceRequests", JSON.stringify(state.maintainanceRequests))
        // },
        removeMaintainanceRequests : (state, {payload}) => {
            const temp = state.maintainanceRequests.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.maintainanceRequests = temp
            localStorage.removeItem("maintainanceRequests")
            localStorage.setItem("maintainanceRequests", JSON.stringify(state.maintainanceRequests))
        },
    }
})

export const {getMaintainanceRequests,removeMaintainanceRequests} = maintainanceRequestsSlice.actions
export default maintainanceRequestsSlice.reducer