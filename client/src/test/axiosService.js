import axios from "axios";
const URL = "www.test.com";

class AxiosService {
  // return {name, age, phoneNum}
  getAllData(name) {
    return axios.get(URL, { name });
  }

  // return token and userInfo
  login(email, password) {
    return axios.post(URL, { email, password });
  }

  register(username, email, password) {
    return axios.post(URL, { username, email, password });
  }

  delete(token) {
    return axios.delete(URL, {
      headers: {
        Authorization: token,
      },
    });
  }

  update(data, token) {
    return axios.patch(URL, { data }, { headers: { Authorization: token } });
  }
}

const axiosService = new AxiosService();
export default axiosService;
