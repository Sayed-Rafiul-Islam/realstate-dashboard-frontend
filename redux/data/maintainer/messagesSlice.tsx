
import { MessageProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const maintainerMessagesJson = typeof window !== "undefined" && localStorage.getItem("maintainerMessages")
const maintainerReceivedMessagesJson = typeof window !== "undefined" && localStorage.getItem("maintainerReceivedMessages")

const initialState = {
    maintainerMessages : maintainerMessagesJson ? JSON.parse(maintainerMessagesJson) : [],
    maintainerReceivedMessages : maintainerReceivedMessagesJson ? JSON.parse(maintainerReceivedMessagesJson) : [],
}



const ownerMessagesSlice = createSlice({
    name : "maintainerMessages",
    initialState,
    reducers : {
        getMaintainerMessages : (state, {payload}) => {
            state.maintainerMessages = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerMessages")
                localStorage.setItem("maintainerMessages", JSON.stringify(state.maintainerMessages))
            }
        },
        getMaintainerReceivedMessages : (state, {payload}) => {
            state.maintainerReceivedMessages = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerReceivedMessages")
                localStorage.setItem("maintainerReceivedMessages", JSON.stringify(state.maintainerReceivedMessages))
            }
        },
        updateMaintainerMessageStatus : (state, {payload}) => {
            const temp = state.maintainerReceivedMessages.filter((item : MessageProps) => {
                if ( item._id  === payload._id) {
                    item.status = true
                }
                return item
            })
            state.maintainerReceivedMessages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerReceivedMessages")
                localStorage.setItem("maintainerReceivedMessages", JSON.stringify(state.maintainerReceivedMessages))
            }
        },
        updateMaintainerMessage : (state, {payload}) => {
            if (payload) {
                const index = state.maintainerReceivedMessages.findIndex((item : MessageProps) => item._id === payload._id)
                state.maintainerReceivedMessages[index] = payload
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("maintainerReceivedMessages")
                    localStorage.setItem("maintainerReceivedMessages", JSON.stringify(state.maintainerReceivedMessages))
                }
            }
            
        },
        createMaintainerMessage : (state, {payload}) => {
            state.maintainerMessages.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerMessages")
                localStorage.setItem("maintainerMessages", JSON.stringify(state.maintainerMessages))
            }
        },
        removeMaintainerMessage : (state, {payload}) => {
            const temp = state.maintainerMessages.filter(({_id} : MessageProps) => _id !== payload._id)
            state.maintainerMessages = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("maintainerMessages")
                localStorage.setItem("maintainerMessages", JSON.stringify(state.maintainerMessages))
            }
        },
    }
})

export const {getMaintainerMessages,getMaintainerReceivedMessages,updateMaintainerMessage,updateMaintainerMessageStatus,removeMaintainerMessage,createMaintainerMessage} = ownerMessagesSlice.actions
export default ownerMessagesSlice.reducer