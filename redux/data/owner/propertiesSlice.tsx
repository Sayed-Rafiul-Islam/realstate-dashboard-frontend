
import { PropertyProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerPropertiesJson = typeof window !== "undefined" && localStorage.getItem("ownerProperties")

const initialState = {
    ownerProperties : ownerPropertiesJson ? JSON.parse(ownerPropertiesJson) : [],
}



const ownerPropertiesSlice = createSlice({
    name : "ownerProperties",
    initialState,
    reducers : {
        getOwnerProperties : (state, {payload}) => {
            state.ownerProperties = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerProperties")
                localStorage.setItem("ownerProperties", JSON.stringify(state.ownerProperties))
            }
        },
        updateOwnerProperty : (state, {payload}) => {
            if (payload) {
                const index = state.ownerProperties.findIndex((item : PropertyProps) => item._id === payload._id)
                state.ownerProperties[index] = payload
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("ownerProperties")
                    localStorage.setItem("ownerProperties", JSON.stringify(state.ownerProperties))
                }
            }
            
        },

        addOwnerProperty : (state, {payload}) => {

            state.ownerProperties.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerProperties")
                localStorage.setItem("ownerProperties", JSON.stringify(state.ownerProperties))
            }
        },
        removeOwnerProperty : (state, {payload}) => {
            const temp = state.ownerProperties.filter(({_id} : PropertyProps) => _id !== payload._id)
            state.ownerProperties = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerProperties")
                localStorage.setItem("ownerProperties", JSON.stringify(state.ownerProperties))
            }
        },
    }
})

export const {getOwnerProperties,addOwnerProperty,updateOwnerProperty,removeOwnerProperty} = ownerPropertiesSlice.actions
export default ownerPropertiesSlice.reducer