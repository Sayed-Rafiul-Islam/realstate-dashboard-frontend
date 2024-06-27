
import { MessageProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const tenantMessagesJson = typeof window !== "undefined" && localStorage.getItem("tenantMessages")
const tenantReceivedMessagesJson = typeof window !== "undefined" && localStorage.getItem("tenantReceivedMessages")

const initialState = {
    tenantMessages : tenantMessagesJson ? JSON.parse(tenantMessagesJson) : [],
    tenantReceivedMessages : tenantReceivedMessagesJson ? JSON.parse(tenantReceivedMessagesJson) : [],
}



const ownerMessagesSlice = createSlice({
    name : "tenantMessages",
    initialState,
    reducers : {
        getTenantMessages : (state, {payload}) => {
            state.tenantMessages = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantMessages")
                localStorage.setItem("tenantMessages", JSON.stringify(state.tenantMessages))
            }
        },
        getTenantReceivedMessages : (state, {payload}) => {
            state.tenantReceivedMessages = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantReceivedMessages")
                localStorage.setItem("tenantReceivedMessages", JSON.stringify(state.tenantReceivedMessages))
            }
        },
        updateTenantMessageStatus : (state, {payload}) => {
            const temp = state.tenantReceivedMessages.filter((item : MessageProps) => {
                if ( item._id  === payload._id) {
                    item.status = true
                }
                return item
            })
            state.tenantReceivedMessages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantReceivedMessages")
                localStorage.setItem("tenantReceivedMessages", JSON.stringify(state.tenantReceivedMessages))
            }
        },
        updateTenantMessage : (state, {payload}) => {
            if (payload) {
                const index = state.tenantReceivedMessages.findIndex((item : MessageProps) => item._id === payload._id)
                state.tenantReceivedMessages[index] = payload
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("tenantReceivedMessages")
                    localStorage.setItem("tenantReceivedMessages", JSON.stringify(state.tenantReceivedMessages))
                }
            }
            
        },
        createTenantMessage : (state, {payload}) => {
            state.tenantMessages.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantMessages")
                localStorage.setItem("tenantMessages", JSON.stringify(state.tenantMessages))
            }
        },
        removeTenantMessage : (state, {payload}) => {
            const temp = state.tenantMessages.filter(({_id} : MessageProps) => _id !== payload._id)
            state.tenantMessages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantMessages")
                localStorage.setItem("tenantMessages", JSON.stringify(state.tenantMessages))
            }
        },
    }
})

export const {getTenantMessages,getTenantReceivedMessages,updateTenantMessage,updateTenantMessageStatus,createTenantMessage,removeTenantMessage} = ownerMessagesSlice.actions
export default ownerMessagesSlice.reducer