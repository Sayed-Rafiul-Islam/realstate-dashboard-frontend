
import { MessageProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const adminMessagesJson = typeof window !== "undefined" && localStorage.getItem("adminMessages")
const adminReceivedMessagesJson = typeof window !== "undefined" && localStorage.getItem("adminReceivedMessages")


const initialState = {
    adminMessages : adminMessagesJson ? JSON.parse(adminMessagesJson) : [],
    adminReceivedMessages : adminReceivedMessagesJson ? JSON.parse(adminReceivedMessagesJson) : [],
}



const adminMessagesSlice = createSlice({
    name : "adminMessages",
    initialState,
    reducers : {
        getAdminMessages : (state, {payload}) => {
            state.adminMessages = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("adminMessages")
                localStorage.setItem("adminMessages", JSON.stringify(state.adminMessages))
            }
        },
        getAdminReceivedMessages : (state, {payload}) => {
            state.adminReceivedMessages = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("adminReceivedMessages")
                localStorage.setItem("adminReceivedMessages", JSON.stringify(state.adminReceivedMessages))
            }
        },
        updateAdminMessageStatus : (state, {payload}) => {
            const temp = state.adminReceivedMessages.filter((item : MessageProps) => {
                if ( item._id  === payload._id) {
                    item.status = true
                }
                return item
            })
            state.adminReceivedMessages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("adminReceivedMessages")
                localStorage.setItem("adminReceivedMessages", JSON.stringify(state.adminReceivedMessages))
            }
        },
        updateAdminMessage : (state, {payload}) => {
            if (payload) {
                const index = state.adminReceivedMessages.findIndex((item : MessageProps) => item._id === payload._id)
                state.adminReceivedMessages[index] = payload
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("adminReceivedMessages")
                    localStorage.setItem("adminReceivedMessages", JSON.stringify(state.adminReceivedMessages))
                }
            }
            
        },
        createAdminMessage : (state, {payload}) => {
            state.adminMessages.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("adminMessages")
                localStorage.setItem("adminMessages", JSON.stringify(state.adminMessages))
            }
        },
        removeAdminMessage : (state, {payload}) => {
            const temp = state.adminMessages.filter(({_id} : MessageProps) => _id !== payload._id)
            state.adminMessages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("adminMessages")
                localStorage.setItem("adminMessages", JSON.stringify(state.adminMessages))
            }
        },
    }
})

export const {getAdminMessages,updateAdminMessage,updateAdminMessageStatus,createAdminMessage,removeAdminMessage,getAdminReceivedMessages} = adminMessagesSlice.actions
export default adminMessagesSlice.reducer