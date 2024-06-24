const router = require("express").Router();
const Todo = require("../models/todo-model");

// 依照title或description查詢待辦事項
router.get("/search", async (req, res) => {
  try {
    let foundTodo = await Todo.find({ title });
    if (!foundTodo) return res.status(400).send("查無此資料");
    return res.send(foundTodo);
  } catch (e) {
    return res.status(400).send(e);
  }
});
