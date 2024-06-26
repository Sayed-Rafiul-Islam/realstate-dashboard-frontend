import { TenantProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerTenantsJson = typeof window !== "undefined" && localStorage.getItem("ownerTenants")

const initialState = {
    ownerTenants : ownerTenantsJson ? JSON.parse(ownerTenantsJson) : [],
}



const ownerTenantsSlice = createSlice({
    name : "ownerTenants",
    initialState,
    reducers : {
        getOwnerTenants : (state, {payload}) => {
            state.ownerTenants = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerTenants")
                localStorage.setItem("ownerTenants", JSON.stringify(state.ownerTenants))
            }
        },
        updateOwnerTenant : (state, {payload}) => {
            const {propertyFile, personalFile, ...rest} = payload 
            const index = state.ownerTenants.findIndex((item : TenantProps) => item._id === payload._id)
            state.ownerTenants[index] = rest
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerTenants")
                localStorage.setItem("ownerTenants", JSON.stringify(state.ownerTenants))
            }
        },

        addOwnerTenant : (state, {payload} ) => {
            // const {propertyFile, personalFile, ...rest} = payload 
            // const data = {...rest, _id : '5'}
            state.ownerTenants.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerTenants")
                localStorage.setItem("ownerTenants", JSON.stringify(state.ownerTenants))
            }
        },
        removeOwnerTenant : (state, {payload}) => {
            const temp = state.ownerTenants.filter(({_id} : TenantProps) => _id !== payload._id)
            state.ownerTenants = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerTenants")
                localStorage.setItem("ownerTenants", JSON.stringify(state.ownerTenants))
            }
        },
    }
})

export const {getOwnerTenants,removeOwnerTenant,addOwnerTenant,updateOwnerTenant} = ownerTenantsSlice.actions
export default ownerTenantsSlice.reducer