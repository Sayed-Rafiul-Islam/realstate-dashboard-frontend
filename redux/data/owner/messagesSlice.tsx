
import { MessageProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerMessagesJson = typeof window !== "undefined" && localStorage.getItem("ownerMessages")
const ownerReceivedMessagesJson = typeof window !== "undefined" && localStorage.getItem("ownerReceivedMessages")

const initialState = {
    ownerMessages : ownerMessagesJson ? JSON.parse(ownerMessagesJson) : [],
    ownerReceivedMessages : ownerReceivedMessagesJson ? JSON.parse(ownerReceivedMessagesJson) : [],
}



const ownerMessagesSlice = createSlice({
    name : "ownerMessages",
    initialState,
    reducers : {
        getOwnerMessages : (state, {payload}) => {
            state.ownerMessages = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMessages")
                localStorage.setItem("ownerMessages", JSON.stringify(state.ownerMessages))
            }
        },
        getOwnerReceivedMessages : (state, {payload}) => {
            state.ownerReceivedMessages = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerReceivedMessages")
                localStorage.setItem("ownerReceivedMessages", JSON.stringify(state.ownerReceivedMessages))
            }
        },
        updateOwnerMessageStatus : (state, {payload}) => {
            const temp = state.ownerReceivedMessages.filter((item : MessageProps) => {
                if ( item._id  === payload._id) {
                    item.status = true
                }
                return item
            })
            state.ownerReceivedMessages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerReceivedMessages")
                localStorage.setItem("ownerReceivedMessages", JSON.stringify(state.ownerReceivedMessages))
            }
        },
        updateOwnerMessage : (state, {payload}) => {
            if (payload) {
                const index = state.ownerReceivedMessages.findIndex((item : MessageProps) => item._id === payload._id)
                state.ownerReceivedMessages[index] = payload
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("ownerReceivedMessages")
                    localStorage.setItem("ownerReceivedMessages", JSON.stringify(state.ownerReceivedMessages))
                }
            }
            
        },
        createOwnerMessage : (state, {payload}) => {
            state.ownerMessages.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMessages")
                localStorage.setItem("ownerMessages", JSON.stringify(state.ownerMessages))
            }
        },
        removeOwnerMessage : (state, {payload}) => {
            const temp = state.ownerMessages.filter(({_id} : MessageProps) => _id !== payload._id)
            state.ownerMessages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMessages")
                localStorage.setItem("ownerMessages", JSON.stringify(state.ownerMessages))
            }
        },
    }
})

export const {getOwnerMessages,updateOwnerMessageStatus,updateOwnerMessage,createOwnerMessage,removeOwnerMessage,getOwnerReceivedMessages} = ownerMessagesSlice.actions
export default ownerMessagesSlice.reducer