
import { PropertyProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const propertiesJson = typeof window !== "undefined" && localStorage.getItem("properties")

const initialState = {
    properties : propertiesJson ? JSON.parse(propertiesJson) : [],
}



const propertiesSlice = createSlice({
    name : "properties",
    initialState,
    reducers : {
        getProperties : (state, {payload}) => {
            state.properties = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("properties")
                localStorage.setItem("properties", JSON.stringify(state.properties))
            }
        },
        updateProperty : (state, {payload}) => {
            const index = state.properties.findIndex((item : PropertyProps) => item._id === payload._id)
            state.properties[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("properties")
                localStorage.setItem("properties", JSON.stringify(state.properties))
            }
        },

        addProperty : (state, {payload}) => {
            state.properties.push(payload)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("properties")
                localStorage.setItem("properties", JSON.stringify(state.properties))
            }
        },
        removeProperty : (state, {payload}) => {
            const temp = state.properties.filter(({_id} : PropertyProps) => _id !== payload._id)
            state.properties = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("properties")
                localStorage.setItem("properties", JSON.stringify(state.properties))
            }
        },
    }
})

export const {getProperties,addProperty,updateProperty,removeProperty} = propertiesSlice.actions
export default propertiesSlice.reducer