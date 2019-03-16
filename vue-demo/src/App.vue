<template>
    <div id="app">
        <button type="button" @click="getUserInfo()"> 获取用户信息</button>
        {{ getResult }}
        <button type="button" @click="login()">登录</button>
        {{ postResult }}
    </div>
</template>

<script>

import apiChain from './utils/util'

var config = {
    header: '',
    baseUrl: 'http://120.79.78.236:3000/mock/39'
}

var api = new apiChain(config)

var log = console.log.bind(console)

export default {
    name: 'App',
    data(){
        return{

            getResult: 'sds',
            postResult: ''

        }
    },

    methods:{
        //npm install --save axios
        getUserInfo(){
            var that = this
            api.user.info.get(
                {
                    'id': 5
                },
                (res)=>{
                    log(res.data)
                    that.getResult = res
                },
                (err)=>{

                }
            )
        },

        login(){
            var that = this
            var user_id = 5
            api.user.pathArg(user_id).login.post(
                {
                    'password': '123',
                    'username': 'username'
                },
                (res)=>{
                    log(res)
                    that.postResult = res
                    log("***", that.postResult)
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
