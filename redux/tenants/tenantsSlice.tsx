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
        updateTenant : (state, {payload}) => {
            const {propertyFile, personalFile, ...rest} = payload 
            const index = state.tenants.findIndex((item : TenantProps) => item._id === payload._id)
            state.tenants[index] = rest
            localStorage.removeItem("tenants")
            localStorage.setItem("tenants", JSON.stringify(state.tenants))
        },

        addTenant : (state, {payload} ) => {
            const {propertyFile, personalFile, ...rest} = payload 
            const data = {...rest, _id : '5'}
            state.tenants.push(data)
            localStorage.removeItem("tenants")
            localStorage.setItem("tenants", JSON.stringify(state.tenants))
        },
        removeTenant : (state, {payload}) => {
            const temp = state.tenants.filter(({_id} : TenantProps) => _id !== payload._id)
            state.tenants = temp
            localStorage.removeItem("tenants")
            localStorage.setItem("tenants", JSON.stringify(state.tenants))
        },
    }
})

export const {getTenants,removeTenant,addTenant,updateTenant} = tenantsSlice.actions
export default tenantsSlice.reducer