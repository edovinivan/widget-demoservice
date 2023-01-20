import Vue from 'vue'
import {createStore} from '@/store/store.ts'
import Vuex from "vuex";
import Component from "vue-class-component";
import VueCookies from "vue-cookies";
import keycloakInstance from "@/plugins/keycloak";
import {State} from "@/store/model";
import axios from "axios";

Vue.use(Vuex);
Vue.use(VueCookies);
@Component({
    components: {
    },
    store:createStore()
})
export default class App extends Vue {

    private name = ''

    mounted(){
        axios.interceptors.request.use(async config => {
            // Обновляем токен
            const token = keycloakInstance.token
            // Добавляем токен в каждый запрос
            config.headers.common['Authorization'] = `Bearer ${token}`
            config.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            return config
        })
        const result = axios.get('http://localhost:8085/api/me')
            .then((response: any) => {
                    //this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                //this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })
        result.then((data)=>{
            this.name = data
        })
    }

    get nameUser(){
        return this.name
    }

    set nameUser(data){
        this.name = data
    }

}