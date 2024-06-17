import { RentProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const tenantRentsJson = typeof window !== "undefined" && localStorage.getItem("tenantRents")


const initialState = {
    tenantRents : tenantRentsJson ? JSON.parse(tenantRentsJson) : [],
}



const tenantRentsSlice = createSlice({
    name : "tenantRents",
    initialState,
    reducers : {
        getTenantRents : (state, {payload}) => {
            state.tenantRents = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantRents")
                localStorage.setItem("tenantRents", JSON.stringify(state.tenantRents))
            }
        },
        updateTenantRent : (state, {payload}) => {
            if (payload) {
                const index = state.tenantRents.findIndex((item : RentProps) => item._id === payload._id)
                state.tenantRents[index] = payload
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("tenantRents")
                    localStorage.setItem("tenantRents", JSON.stringify(state.tenantRents))
                }
            }
            
        },

        addTenantRent : (state, {payload}) => {
            state.tenantRents.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantRents")
                localStorage.setItem("tenantRents", JSON.stringify(state.tenantRents))
            }
        },
        removeTenantRent : (state, {payload}) => {
            const temp = state.tenantRents.filter(({_id} : RentProps) => _id !== payload._id)
            state.tenantRents = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("tenantRents")
                localStorage.setItem("tenantRents", JSON.stringify(state.tenantRents))
            }
        },
    }
})

export const {getTenantRents,removeTenantRent,addTenantRent,updateTenantRent} = tenantRentsSlice.actions
export default tenantRentsSlice.reducer