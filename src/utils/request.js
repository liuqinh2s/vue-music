import axios from "axios";

const NETWORK_ERROR = "网络异常";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 1000,
});

// 请求拦截
instance.interceptors.request.use((req) => {
  console.log(req);
  return req;
});

// 响应拦截
instance.interceptors.response.use((res) => {
  const { result, code, msg = NETWORK_ERROR } = res.data;
  if (code === 200) {
    return result || res.data;
  } else {
    console.error(msg);
    return Promise.reject(msg);
  }
});

// 封装的请求函数
function request(options) {
  options.method ||= "get";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
    delete options.data;
  }
  return instance(options);
}

export default request;