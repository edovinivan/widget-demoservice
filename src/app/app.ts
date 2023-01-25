import Vue from 'vue'
import {createStore} from '@/store/store.ts'
import Vuex from "vuex";
import Component from "vue-class-component";
import VueCookies from "vue-cookies";
import keycloakInstance from "@/plugins/keycloak";
import {Message, State} from "@/store/model";
import axios from "axios";

Vue.use(Vuex);
Vue.use(VueCookies);
@Component({
    components: {
    },
    store:createStore()
})
export default class App extends Vue {

    public messagedto ={ text : ''};
    private name: Array<Message> = [];

    mounted(){
        axios.interceptors.request.use(async config => {
            // Обновляем токен
            const token = keycloakInstance.token
            // Добавляем токен в каждый запрос
            config.headers.common['Authorization'] = `Bearer ${token}`
            //config.headers.common['Authorization'] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRMEI0cFVaRUFESEdsbElyTTJyeXVDT2dhV3VXaENlVlBqbzlheWJ6NXlnIn0.eyJleHAiOjE2NzQ1NzAyOTQsImlhdCI6MTY3NDU2OTk5NCwianRpIjoiZjRmNWM2MzItMzYzOS00YWMxLTk5YjgtOTMwNjU2MjI1MmQwIiwiaXNzIjoiaHR0cDovLzE3Mi4xOC4wLjM6ODA4MC9yZWFsbXMva2MtYXV0aC1yZWFsbSIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI3MTMzMDBiNy0wYzE5LTRmOTgtYTIwMi03OGFlYTc2NjJmNjYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJrcy1hdXRoLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiJkYmE0YTkxOS0xNWY0LTRhZmItOTgzOS02YTc2OWQyYThlMzEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfVVNFUiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWtjLWF1dGgtcmVhbG0iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBhZGRyZXNzIHBob25lIGVtYWlsIiwic2lkIjoiZGJhNGE5MTktMTVmNC00YWZiLTk4MzktNmE3NjlkMmE4ZTMxIiwiYWRkcmVzcyI6e30sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ItCf0LDQstC10Lsg0JrRg9GC0Y_QutC-0LIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwa3MiLCJnaXZlbl9uYW1lIjoi0J_QsNCy0LXQuyIsImZhbWlseV9uYW1lIjoi0JrRg9GC0Y_QutC-0LIiLCJlbWFpbCI6ImZyb250MjMxNjNAZ21haWwuY29tIn0.RV0yP4xim5sWlhUg8mtJA3gmXYqyGWPJ0Lelg6aYk2_P0h67A3Cb01xqsyT6-KTwd_IJt0M0iDC9C8jeAKnvz3Ie3-zL-9RZ9Pw63YHqbhAdNrDMnppTEsiDODYiSSvKV4X-ZFRt7gqcglZUBp6f02K4wmqgUpOsWRPcp3vBbkuvp25tHcLb4YtR9ZdEMnvJGwRhzFxJFlHK0rFJG2ARI4Vk_vY7vH-0B44R7Dzo81p3twVgeHy5caURDqPOw70RbOvT2d0iaXJQSsE1dUxXCvkYhFCzeH6RSImYZQIQo8nxidnDzyAd6-HhXli_DAUBftTAqSce4W1w_1PWAibVNw`
            config.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            return config
        })
        //const result = axios.get('http://localhost:8086/api/message')
        const result = axios.get('http://localhost:8086/api/message')
            .then((response: any) => {
                    //this.loadMask(false);
                    console.log('OK save!!!!!' + response.data);
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


    addProduct(){
        if (this.messagedto.text!=null && this.messagedto.text.length>2) {
            const result = axios.post('http://localhost:8086/api/message', {'text': this.messagedto.text})
            //const result = axios.post('http://demoservice_blog:8086/api/message', {'text': this.messagedto.text})
                .then((response: any) => {
                        //this.loadMask(false);
                        console.log('OK save!!!!!' + response.data);
                        //return response.data;
                    }
                )
                .catch((error) => {
                    //this.loadMask(false);
                    console.log('Ошибка! Не могу связаться с API2. ' + error);
                })
            /*result.then((data)=>{
                this.name = data
            })*/
        }
        return "";
    }



}