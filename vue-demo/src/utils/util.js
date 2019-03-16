import Axios from 'axios'

var log = console.log.bind(console)

var isMethod = function(property){
	var x = ['get', 'post', 'delete', 'put']
	for(var i=0; i<x.length; i++){
		if(x[i]==property){
			return true
		}
	}
	return false
}

var isPathArg = function(property){
	if(property == 'pathArg'){
		return true
	}
	return false
}

var createProxy = function(handler){
	var revocable = Proxy.revocable({}, handler)
	var proxy = revocable.proxy
	return proxy
}

var handlePathArg = function(property, handler){
	var path = handler.path
	var wrap = function(){
		var arg = arguments[0]//f接收到的参数
		var newPath = path + '/' + arg
		handler.path = newPath
		var proxy = createProxy(handler)
		return proxy
	}
	return wrap
}

var handleMethod = function(method, handler, config){
	var path = handler.path
	handler.path = '' //在最终的方法调用的时候清零， 路径清零
	var wrap = function(){
		var data = arguments[0]
		var success = arguments[1]
        var failed = arguments[2]
		var url = config.baseUrl + path
        var header = config.header
        request(url, method, data, header, success, failed)
		log(url)

	}
	return wrap
}

var handlePath = function(property, handler){
	if(handler.last == property){
		//do noting
	}else{
		handler.path += `/${property}`
		handler.last = property
	}
	return createProxy(handler)
}

class apiChain {
	constructor(config) {
		this.handler = {
			last: '',
			path: '',
			get(target, property) {
				if(isMethod(property)){
					var call = handleMethod(property, this, config)
					return call
				}else if(isPathArg(property)){
					var proxy = handlePathArg(property, this)
					return proxy
				}else{
					var proxy = handlePath(property, this)
					return proxy
				}

			}
		}
		this.proxy = createProxy(this.handler)
		return this.proxy
	}
}


var request = function(url, method, data, header, success, failed){

    if(method == 'get'){
        Axios.get(url, {
            params: data
          })
          .then((res) =>{
              success(res)
          })
          .catch((err) =>{
              failed(err)
          })

    }else if (method == 'post') {

        Axios.post(url, data
        ).then((res) => {
            log(res)
            success(res)
        })
        .catch((err) => {
          log(err)
          failed(err)
        })

    }else if (method == 'put') {

    }else if (method == 'delete') {

    }
}

export default apiChain
