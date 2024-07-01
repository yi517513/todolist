const Todo = require("../models/todo-model");

exports.syncTodos = async (req, res) => {
  const { todos } = req.body;
  const userID = req.user._id;
  console.log("Syncing todos for user:", userID);

  const promises = todos.map(async (todo) => {
    console.log("Processing todo:", todo);
    const existingTodo = await Todo.findOne({ todoID: todo.todoID, userID });

    if (existingTodo) {
      console.log("existingTodo found:", existingTodo);
      return Todo.updateOne({ todoID: todo.todoID, userID }, todo);
    } else {
      console.log("new todo");
      return new Todo({ ...todo, userID }).save();
    }
  });

  try {
    await Promise.all(promises);
    res.json({ message: "本地資料同步成功" });
  } catch (error) {
    console.error("Error syncing todos:", error);
    return res.status(500).json({ error: error.message });
  }
};
