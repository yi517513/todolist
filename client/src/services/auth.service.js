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
      .get(AUTH_API_URL + "/getCurrentUser", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => response.data);
  }
  verifytoken(token) {
    return axios.get(AUTH_API_URL + "/verifytoken", {
      headers: {
        Authorization: token,
      },
    });
  }

  changePassword(password, token) {
    return axios.patch(
      AUTH_API_URL + "/change-password",
      { password },
      {
        headers: { Authorization: token },
      }
    );
  }

  deleteAccount(token) {
    return axios.delete(AUTH_API_URL + "/delete", {
      headers: {
        Authorization: token,
      },
    });
  }
}

const authService = new AuthService();
export default authService;
