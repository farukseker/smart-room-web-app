import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthService from "@/composables/AuthService";
import { globalCookiesConfig } from "vue3-cookies";

var date = new Date;
date.setDate(date.getDate() + 15);

globalCookiesConfig({
    expireTimes: date,
    path: "/",
    domain: process.env.VUE_APP_DOMAIN,
    secure: true,
    sameSite: "None",
});

axios.defaults.baseURL = process.env.VUE_APP_API_PATH

const carrier_switch = 'Bearer'

axios.interceptors.request.use(
    ( config ) => {
        console.log('config')
        config.headers["Authorization"] = `${carrier_switch} ${AuthService.getAccessToken()}`;
        return config;
    });

axios.interceptors.response.use(
    (response) => {
        return response
    }, async error => {
        if (error.response.status === 401 && !error.config.url.endsWith('/refresh/')) {
            try {
                const refresh = await AuthService.refreshToken()
                error.config.headers['Authorization'] = `${carrier_switch} ${refresh}` ;
                return axios(error.config);
            } catch (e) {
                AuthService.logout()
                router.push({name:'login'})
            }

        } else if (error.response.status === 401 && error.config.url.endsWith('/refresh/')) {
            AuthService.logout()
            router.push({name:'login'})
        }
        return Promise.reject(error);
    }
)

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
