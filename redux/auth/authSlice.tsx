"use client"
import { createSlice } from "@reduxjs/toolkit"

const userJson = typeof window !== "undefined" && localStorage.getItem("user")

// const initialState = {
//     documents : documentsJson ? JSON.parse(documentsJson) : [],
// }

const initialState = {
    user : userJson ? JSON.parse(userJson) : [],
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        addUser: (state, {payload}) => {
            state.user = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("user")
                localStorage.setItem("user", JSON.stringify(state.user))
            }
        },
        removeUser: (state) => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem("user")
                localStorage.removeItem('tenantInfo')
                localStorage.removeItem('ownerInfo')
                localStorage.removeItem('maintainerInfo')
                localStorage.removeItem('accessToken')
                localStorage.removeItem('role')
                localStorage.removeItem("ownerProperties")
                localStorage.removeItem("ownerUnits")
                localStorage.removeItem("documents")
                localStorage.removeItem("tenantDocuments")
                localStorage.removeItem("expenses")
                localStorage.removeItem("propertyForm")
                localStorage.removeItem("tenantForm")
                localStorage.removeItem("invoices")
                localStorage.removeItem("maintainanceRequests")
                localStorage.removeItem("maintainers")
                localStorage.removeItem("messages")
                localStorage.removeItem("orders")
                localStorage.removeItem("ownerPackages")
                localStorage.removeItem("owners")
                localStorage.removeItem("packages")
                localStorage.removeItem("properties")
                localStorage.removeItem("rents")
                localStorage.removeItem("earnings")
                localStorage.removeItem("monthlyRecords")
                localStorage.removeItem("notifications")
                localStorage.removeItem("expenseTypes")
                localStorage.removeItem("gateways")
                localStorage.removeItem("invoiceTypes")
                localStorage.removeItem("maintainanceTypes")
                localStorage.removeItem("tenants")
                localStorage.removeItem("units")
                localStorage.removeItem("allUsers")
                localStorage.removeItem("ownerMaintainanceTypes")
                localStorage.removeItem("ownerMaintainers")
                localStorage.removeItem("ownerMaintainanceRequests")
                localStorage.removeItem("maintainerMaintainanceRequests")
                localStorage.removeItem("tenantMaintainanceRequests")
         
            }
            state.user = []
        }
    },
    // extraReducers : {}
})

export const {addUser,removeUser} = userSlice.actions
// export const getAllUsers = (state : any) =>state.user.user
export default userSlice.reducer