import axios from "axios";
const TODO_URL = "http://localhost:8080/api/todo";

class TodoService {
  // 儲存待辦事項
  saveTodo(text, check, userID, todoID, token, updatedAt) {
    return axios.post(
      TODO_URL,
      { text, check, userID, todoID, updatedAt },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // 更新待辦事項
  updateTodo(text, check, userID, todoID, token, updatedAt) {
    return axios.patch(
      TODO_URL + "/" + todoID,
      { text, check, userID, todoID, updatedAt },
      { headers: { Authorization: token } }
    );
  }

  // 取得待辦事項
  getAllTodo(token) {
    return axios.get(TODO_URL, { headers: { Authorization: token } });
  }

  // 同步待辦事項
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
}

const todoService = new TodoService();
export default todoService;
