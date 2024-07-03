import axios from "axios";
const AUTH_API_URL = "http://localhost:8080/api/user";

class AuthService {
  // 註冊
  register(username, email, password) {
    return axios.post(AUTH_API_URL + "/register", {
      username,
      email,
      password,
    });
  }

  // 登入
  login(email, password) {
    return axios.post(AUTH_API_URL + "/login", { email, password });
  }
}

const authService = new AuthService();
export default authService;
