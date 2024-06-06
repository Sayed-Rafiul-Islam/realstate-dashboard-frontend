
import {createSlice } from "@reduxjs/toolkit"

const notificationsJson = typeof window !== "undefined" && window.localStorage.getItem("notifications")

const initialState = {
    notifications : notificationsJson ? JSON.parse(notificationsJson) : [],
}



const notificationsSlice = createSlice({
    name : "notifications",
    initialState,
    reducers : {
        getNotifications : (state, {payload}) => {
            state.notifications = payload
            window.localStorage.removeItem("notifications")
            window.localStorage.setItem("notifications", JSON.stringify(state.notifications))
        },
        addNotification : (state, {payload}) => {
            state.notifications.push(payload)
            window.localStorage.removeItem("notifications")
            window.localStorage.setItem("notifications", JSON.stringify(state.notifications))
        },
        // updatenotificationstatus : (state, {payload}) => {
        //     const temp = state.notifications.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.notifications = temp
        //     window.localStorage.removeItem("notifications")
        //     window.localStorage.setItem("notifications", JSON.stringify(state.notifications))
        // },


        // removeEarning : (state, {payload}) => {
        //     const temp = state.notifications.filter(({_id} : InvoiceProps) => _id !== payload._id)
        //     state.notifications = temp
        //     window.localStorage.removeItem("notifications")
        //     window.localStorage.setItem("notifications", JSON.stringify(state.notifications))
        // },
    }
})

export const {getNotifications,addNotification} = notificationsSlice.actions
export default notificationsSlice.reducer