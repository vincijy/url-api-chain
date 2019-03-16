# url-api-chain
URL  API 链式调用, 基于es6。根据URL实现完全动态的调用。

# 介绍

# 依赖
npm install --save axios


## vue-demo 示例


```

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

```
