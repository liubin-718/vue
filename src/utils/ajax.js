import Vue from 'vue'
import axios from 'axios'
// import store from '../store'
// 兼容ie10 promise resolve之后then不执行的问题
import MyPromise from 'promise'
import { Store } from 'vuex'

let ajaxCounter = 0
function rqs(data) {return JSON.stringify(data)}
// 获取vue链
const $$context = Vue.prototype

const ajax = axios.create({
    baseURL: '',
    // baseURL: '/cbnew',
    timeout: 60000,
    transformRequest: [rqs],
    headers: {
        'Content-Type': 'application/json'
    }
})
ajax.interceptors.request.use(
    config => {
        if(!config['noLoading']){
            ajaxCounter++
            Store.commit('setLoading', true)
        }
        config.headers.token = store.state.app.token
        if(config.method === 'get'){
            config.data = true
        }
        return config
    },
    err => {
        ajaxCounter = 0
        store.commit('setLoading', false)
        return new MyPromise((resolve, reject) => reject(err))
    }
)
ajax.interceptors.response.use(
    response => {
        if(!response.config['noLoading'] && ajaxCounter > 0){
            ajaxCounter--
        }
        if(ajaxCounter <= 0){
            ajaxCounter = 0
            store.commit('setLoading', false)
        }
        // 重映射返回信息
        if(response.data.errorMsg){
            response.data.errorMessage = response.data.errorMsg
            delete response.data.errorMsg
        }
        let result = response.data
        if(response.config.responseType === 'blob'){
            result = {
                headers: response.headers,
                data: response.data
            }
        }
        return new MyPromise((resolve) => resolve(result))
    },
    err => {
        ajaxCounter = 0
        store.commit('setLoading', false)
        return new MyPromise((resolve, reject) => reject(err))
    }
)

export default ajax
