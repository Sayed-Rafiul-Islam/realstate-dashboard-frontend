import axios from "axios";


export default axios.create({
    baseURL : "http://localhost:5000/api/"
})

// https://realstate-dashboard-backend.vercel.app/api/
// http://localhost:5000/api/