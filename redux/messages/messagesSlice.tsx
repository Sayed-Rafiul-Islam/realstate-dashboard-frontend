
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
            if (typeof window !== 'undefined') {
            localStorage.removeItem("messages")
            localStorage.setItem("messages", JSON.stringify(state.messages))
            }
        },
        updateMessageStatus : (state, {payload}) => {
            const temp = state.messages.filter((item : MessageProps) => {
                if ( item._id  === payload._id) {
                    item.status = true
                }
                return item
            })
            state.messages = temp
            if (typeof window !== 'undefined') {
            localStorage.removeItem("messages")
            localStorage.setItem("messages", JSON.stringify(state.messages))
            }
        }
    }
})

export const {getmessages,updateMessageStatus} = messagesSlice.actions
export default messagesSlice.reducer