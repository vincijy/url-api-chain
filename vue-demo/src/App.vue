<template>
    <div id="app">
        <button type="button" @click="getUserInfo()"> 获取用户信息</button>
        <button type="button" @click="login()">登录</button>
    </div>
</template>

<script>

import apiChain from './utils/util'

var config = {
    header: '',
    baseUrl: 'http://120.79.78.236:3000/mock/39'
}

var api = new apiChain(config)

export default {
    name: 'App',
    data(){
        return{

            'getRes': '',
            'postRes': ''

        }
    },

    methods:{
        //npm install --save axios
        getUserInfo(){
            api.user.info.get(
                {
                    'id': 5
                },
                (res)=>{
                    log(res.data)
                },
                (err)=>{

                }
            )
        },

        login(){
            var user_id = 5
            api.user.pathArg(user_id).login.post(
                {
                    'password': '123',
                    'username': 'username'
                },
                (res)=>{
                    log(res)
                },
                (err)=>{
                    log(err)
                }
            )
        }
    }
}
</script>

<style>

</style>
