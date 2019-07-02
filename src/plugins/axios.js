import Vue from 'vue'
// Lib imports
import axios from 'axios'

let baseURL;
if (process.env.NODE_ENV == "development") {
        baseURL = "http://localhost:3000"
} else {
        baseURL = "https://smc.leanapp.cn"
}

axios.defaults.baseURL = baseURL

Vue.prototype.$http = axios
