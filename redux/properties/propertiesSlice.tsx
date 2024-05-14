
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
        updateProperty : (state, {payload}) => {

            const temp = state.properties.filter((item : PropertyProps) => {
                if ( item._id  === payload._id) {
                    item.name = payload.name
                    item.description = payload.description
                    item.location = payload.location
                    item.coverImage = payload.coverImage
                    item.unitCount = payload.unitCount
                    item.rooms = payload.rooms
                    item.available = payload.available
                    item.tenants = payload.tenants
                    item.deposit = payload.deposit
                    item.lateFee = payload.lateFee
                    item.rentType = payload.rentType
                    item.city = payload.city
                    item.state = payload.state
                    item.country = payload.country
                    item.postCode = payload.postCode
                }
                return item
            })
            state.properties = temp
            localStorage.removeItem("properties")
            localStorage.setItem("properties", JSON.stringify(state.properties))
        },

        addProperty : (state, {payload}) => {

            state.properties.push(payload)
            console.log(state.properties)
            // localStorage.removeItem("properties")
            // localStorage.setItem("properties", JSON.stringify(state.properties))
        },
        removeProperty : (state, {payload}) => {
            const temp = state.properties.filter(({_id} : PropertyProps) => _id !== payload._id)
            state.properties = temp
            localStorage.removeItem("properties")
            localStorage.setItem("properties", JSON.stringify(state.properties))
        },
    }
})

export const {getProperties,addProperty,updateProperty,removeProperty} = propertiesSlice.actions
export default propertiesSlice.reducer