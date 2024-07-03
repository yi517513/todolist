import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../slices/authSlice";
import ProfileService from "../services/profile.service";
import TodoService from "../services/todo.service";

const useAuth = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const initialize = async () => {
      const tokenFromStorage = localStorage.getItem("token");
      if (tokenFromStorage) {
        try {
          const response = await ProfileService.getCurrentUser(
            tokenFromStorage
          );
          const user = response.data;
          dispatch(setUser({ user, token: tokenFromStorage }));

          const localTodos = Object.keys(localStorage)
            .filter((key) => key.startsWith("todo_"))
            .map((key) => JSON.parse(localStorage.getItem(key)));

          await TodoService.syncTodos(tokenFromStorage, localTodos);

          const todosFromDB = await TodoService.getAllTodo(tokenFromStorage);
          if (todosFromDB.data) {
            todosFromDB.data.forEach((todo) => {
              const { date, userID, __v, _id, ...cleanTodo } = todo;
              localStorage.setItem(
                `todo_${cleanTodo.todoID}`,
                JSON.stringify(cleanTodo)
              );
            });
          }
        } catch (e) {
          console.log("Error during initialization:", e);
        }
      }
    };
    initialize();
  }, [dispatch, token]);

  return { token, user };
};

export default useAuth;
