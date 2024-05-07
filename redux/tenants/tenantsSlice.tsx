import { TenantProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const tenantsJson = typeof window !== "undefined" && localStorage.getItem("tenants")

const initialState = {
    tenants : tenantsJson ? JSON.parse(tenantsJson) : [],
}



const tenantsSlice = createSlice({
    name : "tenants",
    initialState,
    reducers : {
        getTenants : (state, {payload}) => {
            state.tenants = payload
            localStorage.removeItem("tenants")
            localStorage.setItem("tenants", JSON.stringify(state.tenants))
        },
        // updatetenantstatus : (state, {payload}) => {
        //     const temp = state.tenants.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.tenants = temp
        //     localStorage.removeItem("tenants")
        //     localStorage.setItem("tenants", JSON.stringify(state.tenants))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.tenants.push(payload)
        //     console.log(state.tenants)
        //     localStorage.removeItem("tenants")
        //     localStorage.setItem("tenants", JSON.stringify(state.tenants))
        // },
        removeTenant : (state, {payload}) => {
            const temp = state.tenants.filter(({_id} : TenantProps) => _id !== payload._id)
            state.tenants = temp
            localStorage.removeItem("tenants")
            localStorage.setItem("tenants", JSON.stringify(state.tenants))
        },
    }
})

export const {getTenants,removeTenant} = tenantsSlice.actions
export default tenantsSlice.reducer