import axios from "axios";
const AUTH_API_URL = "http://localhost:8080/api/user";

class AuthService {
  register(username, email, password) {
    return axios.post(AUTH_API_URL + "/register", {
      username,
      email,
      password,
    });
  }
  login(email, password) {
    return axios.post(AUTH_API_URL + "/login", { email, password });
  }
  getCurrentUser(token) {
    return axios
      .get(AUTH_API_URL + "/current", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => response.data);
  }
}

const authService = new AuthService();
export default authService;
