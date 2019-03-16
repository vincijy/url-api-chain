# url-api-chain
URL  API 链式调用, 基于es6。根据URL实现完全动态的调用。

# demo运行
```
npm install --save axios
npm run dev
```

# 使用
#### 示例:GET
```
GET /user/info?id=5
```
对应JS请求:

```
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
```
#### 示例:POST, 且路径含有参数

```
POST /user/5/login
发送数据

data = {
    'password': '123',
    'username': 'username'    
}
```

对应JS请求:

```
api.user.(5).login.post(
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
```



## 在vue 中使用示例

```

import apiChain from './utils/util'

var config = {
    header: '',
    baseUrl: 'http://120.79.78.236:3000/mock/39'
}

var api = new apiChain(config)

export default {
    name: 'App',

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
            api.user.(user_id).login.post(
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
