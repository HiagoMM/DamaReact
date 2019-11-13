import Axios from "axios";

const api = Axios.create({
  baseURL: "http://10.5.3.14:8080"
});

api.interceptors.response.use((res, err) => {
  console.log(err);
  return res;
});
export default api;
