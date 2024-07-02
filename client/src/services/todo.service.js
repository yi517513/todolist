import axios from "axios";
const TODO_URL = "http://localhost:8080/api/todo";

class TodoService {
  saveTodo(text, check, userID, todoID, token, updateDate) {
    return axios.post(
      TODO_URL,
      { text, check, userID, todoID, updateDate },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  updateTodo(text, check, userID, todoID, token, updateDate) {
    return axios.patch(
      TODO_URL + "/" + todoID,
      { text, check, userID, todoID, updateDate },
      { headers: { Authorization: token } }
    );
  }
  getAllTodo(token) {
    return axios.get(TODO_URL, { headers: { Authorization: token } });
  }
  // 本地上傳到DB
  syncTodos = async (token, todos) => {
    try {
      const response = await axios.post(
        TODO_URL + "/sync",
        { todos },
        { headers: { Authorization: token } }
      );
      return response.data;
    } catch (error) {
      console.error("Sync Error:", error);
      throw error;
    }
  };
  // 選取特定日期的資料
}

const todoService = new TodoService();
export default todoService;
