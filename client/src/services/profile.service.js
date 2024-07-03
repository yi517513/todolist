import axios from "axios";
const PROFILE_API_URL = "http://localhost:8080/api/profile";

class ProfileService {
  // 獲取當前的用戶資料
  getCurrentUser(token) {
    return axios.get(PROFILE_API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 變更用戶密碼
  changePassword(password, token) {
    return axios.patch(
      PROFILE_API_URL + "/changPassword",
      { password },
      {
        headers: { Authorization: token },
      }
    );
  }

  // 刪除帳號
  deleteAccount(token) {
    return axios.delete(PROFILE_API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }
}

const profileService = new ProfileService();
export default profileService;
