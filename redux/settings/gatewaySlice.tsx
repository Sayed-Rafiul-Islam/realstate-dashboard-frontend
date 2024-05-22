import { InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const gatewaysJson = typeof window !== "undefined" && localStorage.getItem("gateways")

const initialState = {
    gateways : gatewaysJson ? JSON.parse(gatewaysJson) : [],
}



const gatewaysSlice = createSlice({
    name : "gateways",
    initialState,
    reducers : {
        getGateways : (state, {payload}) => {
            state.gateways = payload
            localStorage.removeItem("gateways")
            localStorage.setItem("gateways", JSON.stringify(state.gateways))
        },
        // updategatewaystatus : (state, {payload}) => {
        //     const temp = state.gateways.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.gateways = temp
        //     localStorage.removeItem("gateways")
        //     localStorage.setItem("gateways", JSON.stringify(state.gateways))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.gateways.push(payload)
        //     console.log(state.gateways)
        //     localStorage.removeItem("gateways")
        //     localStorage.setItem("gateways", JSON.stringify(state.gateways))
        // },
        removeGateway : (state, {payload}) => {
            const temp = state.gateways.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.gateways = temp
            localStorage.removeItem("gateways")
            localStorage.setItem("gateways", JSON.stringify(state.gateways))
        },
    }
})

export const {getGateways,removeGateway} = gatewaysSlice.actions
export default gatewaysSlice.reducer