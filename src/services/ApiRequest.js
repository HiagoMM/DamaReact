import Axios from "axios";
import Swal from "sweetalert2";

const api = Axios.create({
  // baseURL: "https://damaspringapi.herokuapp.com"
  baseURL: "http://localhost:8080"
});
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

api.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response) {
      Toast.fire({
        type: "error",
        title: err.response.data.msg
      });
    }
    throw err;
  }
);
export default api;
