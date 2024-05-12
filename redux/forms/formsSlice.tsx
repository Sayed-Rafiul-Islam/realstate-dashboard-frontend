
import { UnitProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const propertyFormJson = typeof window !== "undefined" && localStorage.getItem("propertyForm")

const initialState = {
    propertyForm : propertyFormJson ? JSON.parse(propertyFormJson) : {
        initialData1 : {
            propertyName : '',
            unitCount : 0,
            description : "",
            image : '',
            address : '',
            city : '',
            state : '',
            country : '',
            postCode : ''
        },
            initialData2 : [],
        initialData3 : {
            rent : 0,
            deposit : 0,
            lateFee : 0,
            rentType : ""
        }
    },
}



const formsSlice = createSlice({
    name : "forms",
    initialState,
    reducers : {
        addPropertyData1 : (state, {payload}) => {
            state.propertyForm.initialData1 = payload
            // localStorage.removeItem("units")
            // localStorage.setItem("units", JSON.stringify(state.units))
        },
        addPropertyData2 : (state, {payload}) => {
            state.propertyForm.initialData2 = payload
            // console.log(state.propertyForm)
            // localStorage.removeItem("units")
            // localStorage.setItem("units", JSON.stringify(state.units))
        },
        addPropertyData3 : (state, {payload}) => {
            state.propertyForm.initialData3 = payload
            // localStorage.removeItem("units")
            // localStorage.setItem("units", JSON.stringify(state.units))
        },
        // removeUnit : (state, {payload}) => {
        //     const temp = state.units.filter(({_id} : UnitProps) => _id !== payload)
        //     state.units = temp
        //     localStorage.removeItem("units")
        //     localStorage.setItem("units", JSON.stringify(state.units))
        // },
    }
})

export const {addPropertyData1,addPropertyData2,addPropertyData3} = formsSlice.actions
export default formsSlice.reducer