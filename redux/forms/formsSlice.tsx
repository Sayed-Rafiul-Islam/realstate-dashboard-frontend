
import { UnitProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const propertyFormJson = typeof window !== "undefined" && localStorage.getItem("propertyForm")
const tenantFormJson = typeof window !== "undefined" && localStorage.getItem("tenantForm")

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
            postCode : '',
            status : false
        },
            initialData2 : [],
        initialData3 : {
            rent : 0,
            deposit : 0,
            lateFee : 0,
            rentType : ""
        }
    },

    tenantForm : tenantFormJson ? JSON.parse(tenantFormJson) : {
        initialData1 : {
            name : '',
            email : '',
            phone : '',
            NID : 0,
            occupation : '',
            age : 1,
            familyMember : 1,
            image : '',
            address : '',
            city : '',
            state : '',
            country : '',
            postalCode : '',
        },
        initialData2 : {
            property : '',
            unit : '',
            startDate : '',
            endDate : '',
            rent : 0,
            deposit : 0,
            lateFee : 0,
            rentType : 'monthly',
            due : 0
        },
        initialData3 : {
            propertyDoc : '',
            personalDoc : ''
        }
    }
}



const formsSlice = createSlice({
    name : "forms",
    initialState,
    reducers : {
        addPropertyData1 : (state, {payload}) => {
            state.propertyForm.initialData1 = payload
        },
        addPropertyData2 : (state, {payload}) => {
            state.propertyForm.initialData2 = payload
        },
        addPropertyData3 : (state, {payload}) => {
            state.propertyForm.initialData3 = payload
        },

        addTenantData1 : (state, {payload}) => {
            state.tenantForm.initialData1 = payload
        },
        addTenantData2 : (state, {payload}) => {
            state.tenantForm.initialData2 = payload
        },
        addTenantData3 : (state, {payload}) => {
            state.tenantForm.initialData3 = payload
        },
        // removeUnit : (state, {payload}) => {
        //     const temp = state.units.filter(({_id} : UnitProps) => _id !== payload)
        //     state.units = temp
        //     localStorage.removeItem("units")
        //     localStorage.setItem("units", JSON.stringify(state.units))
        // },
    }
})

export const {
    addPropertyData1,
    addPropertyData2,
    addPropertyData3,
    addTenantData1,
    addTenantData2,
    addTenantData3
} = formsSlice.actions
export default formsSlice.reducer