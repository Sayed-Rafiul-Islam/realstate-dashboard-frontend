
import { MessageProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const messagesJson = typeof window !== "undefined" && localStorage.getItem("messages")

const initialState = {
    messages : messagesJson ? JSON.parse(messagesJson) : [],
}



const messagesSlice = createSlice({
    name : "messages",
    initialState,
    reducers : {
        getmessages : (state, {payload}) => {
            state.messages = payload
            localStorage.removeItem("messages")
            localStorage.setItem("messages", JSON.stringify(state.messages))
        },
        updateMessageStatus : (state, {payload}) => {
            const temp = state.messages.filter((item : MessageProps) => {
                if ( item._id  === payload._id) {
                    item.status = true
                }
                return item
            })
            state.messages = temp
            localStorage.removeItem("messages")
            localStorage.setItem("messages", JSON.stringify(state.messages))
        },

        // addOwnerPackage : (state, {payload}) => {
        //     state.messages.push(payload)
        //     console.log(state.messages)
        //     localStorage.removeItem("messages")
        //     localStorage.setItem("messages", JSON.stringify(state.messages))
        // },
        // removePackage : (state, {payload}) => {
        //     const temp = state.packages.filter(({_id} : PackageProps) => _id !== payload._id)
        //     state.packages = temp
        //     localStorage.removeItem("packages")
        //     localStorage.setItem("packages", JSON.stringify(state.packages))
        // },
    }
})

export const {getmessages,updateMessageStatus} = messagesSlice.actions
export default messagesSlice.reducer