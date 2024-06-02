import axios from "axios";

export const baseURL_vercel = 'https://realstate-dashboard-backend.vercel.app/'
export const baseURL_local = 'http://localhost:5000/'


export default axios.create({
    baseURL : "http://localhost:5000/api/"
    // baseURL : "https://realstate-dashboard-backend.vercel.app/api/"
})

// https://realstate-dashboard-backend.vercel.app/api/
// http://localhost:5000/api/