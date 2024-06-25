import axios from "axios";
const AUTH_API_URL = "http://localhost:8080/api/user";

class AuthService {
  register(user, email, password) {
    return axios.post(AUTH_API_URL + "/register", {
      user,
      email,
      password,
    });
  }
  login(email, password) {
    return axios.post(AUTH_API_URL + "/login", { email, password });
  }
}

export default new AuthService();
