import { GatewayProps, InvoiceProps } from "@/types"
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
            if (typeof window !== 'undefined') {
            localStorage.removeItem("gateways")
            localStorage.setItem("gateways", JSON.stringify(state.gateways))
            }
        },
        updateGateway : (state, {payload}) => {
            const index = state.gateways.findIndex((item : GatewayProps) => item._id === payload._id)
            state.gateways[index] = payload
            if (typeof window !== 'undefined') {
            localStorage.removeItem("gateways")
            localStorage.setItem("gateways", JSON.stringify(state.gateways))
            }
        },

        addGateway : (state, {payload}) => {
            state.gateways.push(payload)
            if (typeof window !== 'undefined') {
            localStorage.removeItem("gateways")
            localStorage.setItem("gateways", JSON.stringify(state.gateways))
            }
        },
        removeGateway : (state, {payload}) => {
            const temp = state.gateways.filter(({_id} : InvoiceProps) => _id !== payload._id)
            state.gateways = temp
            if (typeof window !== 'undefined') {
            localStorage.removeItem("gateways")
            localStorage.setItem("gateways", JSON.stringify(state.gateways))
            }
        },
    }
})

export const {getGateways,removeGateway,addGateway,updateGateway} = gatewaysSlice.actions
export default gatewaysSlice.reducer