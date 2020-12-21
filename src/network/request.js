import axios from 'axios'

//可以多个实例 每个实例中配置不同的baseUrl timeout等参数

/*
全局基础配置
axios.defaults.baseURL = ''
axios.defaults.timeout = 5000
axios.defaults.headers = ''
 */

/*
  //全局拦截器
  //全局请求拦截器
  axios.interceptors.request.use()
  //全局响应拦截器
  axios.interceptors.response.use()
 */

export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })
  //实例请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // console.log(config);
      config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
      //此处可以显示网络等待图标(遮罩 showDialog) 在响应拦截时取消遮罩
      //此处还可以将config特殊处理 比如单独添加headers等等
      //对请求参数序列化等等
      return config
  },(err) => {
      console.log(err);
    })
  //实例响应拦截器
  instance.interceptors.response.use(
    (result) => {
      //筛选结果
    return  result.data
  },(error) => {

  })
  //发送正在的网络请求
  return instance(config)
}


export function requestAll(configs){
  console.log(configs);
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  let vArray = new Array();
  for(let p of configs){
    vArray.push(instance(p))
  }
  return axios.all(vArray)
}


//使用示例
/*

request({
  url:'/home/data',
  method:'get',
  params:{
    type:'sell',
    page:1
  }
}).then((res)=>{
  console.log(res);
}).catch((err) => {
  console.log(err);
})

request({
  url:'/home',
  method:'post',
  data:{

  },
  headers:{

  }
}).then((res)=>{
  console.log(res);
}).catch((err) => {
  console.log(err);
})
*/
