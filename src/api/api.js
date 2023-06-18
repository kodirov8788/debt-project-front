import axios from "axios";


// https://debt-project.onrender.com/
const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

export default instance

