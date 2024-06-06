
import { MessageProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const messagesJson = typeof window !== "undefined" && window.localStorage.getItem("messages")

const initialState = {
    messages : messagesJson ? JSON.parse(messagesJson) : [],
}



const messagesSlice = createSlice({
    name : "messages",
    initialState,
    reducers : {
        getmessages : (state, {payload}) => {
            state.messages = payload
            window.localStorage.removeItem("messages")
            window.localStorage.setItem("messages", JSON.stringify(state.messages))
        },
        updateMessageStatus : (state, {payload}) => {
            const temp = state.messages.filter((item : MessageProps) => {
                if ( item._id  === payload._id) {
                    item.status = true
                }
                return item
            })
            state.messages = temp
            window.localStorage.removeItem("messages")
            window.localStorage.setItem("messages", JSON.stringify(state.messages))
        },

        // addOwnerPackage : (state, {payload}) => {
        //     state.messages.push(payload)
        //     console.log(state.messages)
        //     window.localStorage.removeItem("messages")
        //     window.localStorage.setItem("messages", JSON.stringify(state.messages))
        // },
        // removePackage : (state, {payload}) => {
        //     const temp = state.packages.filter(({_id} : PackageProps) => _id !== payload._id)
        //     state.packages = temp
        //     window.localStorage.removeItem("packages")
        //     window.localStorage.setItem("packages", JSON.stringify(state.packages))
        // },
    }
})

export const {getmessages,updateMessageStatus} = messagesSlice.actions
export default messagesSlice.reducer