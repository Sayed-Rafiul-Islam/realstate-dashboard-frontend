
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
            localStorage.removeItem("properties")
            localStorage.setItem("properties", JSON.stringify(state.properties))
        },
        // updatepropertieStatus : (state, {payload}) => {
        //     const temp = state.properties.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.properties = temp
        //     localStorage.removeItem("properties")
        //     localStorage.setItem("properties", JSON.stringify(state.properties))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.properties.push(payload)
        //     console.log(state.properties)
        //     localStorage.removeItem("properties")
        //     localStorage.setItem("properties", JSON.stringify(state.properties))
        // },
        // removePackage : (state, {payload}) => {
        //     const temp = state.packages.filter(({_id} : PackageProps) => _id !== payload._id)
        //     state.packages = temp
        //     localStorage.removeItem("packages")
        //     localStorage.setItem("packages", JSON.stringify(state.packages))
        // },
    }
})

export const {getProperties} = propertiesSlice.actions
export default propertiesSlice.reducer