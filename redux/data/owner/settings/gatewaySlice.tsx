import { GatewayProps, InvoiceProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerGatewaysJson = typeof window !== "undefined" && localStorage.getItem("ownerGateways")

const initialState = {
    ownerGateways : ownerGatewaysJson ? JSON.parse(ownerGatewaysJson) : [],
}



const ownerGatewaysSlice = createSlice({
    name : "ownerGateways",
    initialState,
    reducers : {
        getOwnerGateways : (state, {payload}) => {
            state.ownerGateways = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerGateways")
                localStorage.setItem("ownerGateways", JSON.stringify(state.ownerGateways))
            }
        },
        updateOwnerGateway : (state, {payload}) => {
            const index = state.ownerGateways.findIndex((item : GatewayProps) => item._id === payload._id)
            state.ownerGateways[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerGateways")
                localStorage.setItem("ownerGateways", JSON.stringify(state.ownerGateways))
            }
        },

        addOwnerGateway : (state, {payload}) => {
            state.ownerGateways.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerGateways")
                localStorage.setItem("ownerGateways", JSON.stringify(state.ownerGateways))
            }
        },
        removeOwnerGateway : (state, {payload}) => {
            const temp = state.ownerGateways.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.ownerGateways = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerGateways")
                localStorage.setItem("ownerGateways", JSON.stringify(state.ownerGateways))
            }
        },
    }
})

export const {getOwnerGateways,removeOwnerGateway,addOwnerGateway,updateOwnerGateway} = ownerGatewaysSlice.actions
export default ownerGatewaysSlice.reducer