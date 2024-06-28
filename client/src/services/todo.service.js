import axios from "axios";
const TODO_URL = "http://localhost:8080/api/todo";

class TodoService {
  addTodo(text, check, userID, id, token) {
    return axios.post(
      TODO_URL,
      { text, check, userID, id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  editTodo(text, check, id) {
    return axios.post(TODO_URL + "/id", { text, check });
  }
}

const todoService = new TodoService();
export default todoService;
