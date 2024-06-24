const router = require("express").Router();
const Todo = require("../models/todo-model");
const todoValidation = require("../validation").todoValidation;

router.use("/", (req, res, next) => {
  console.log("正在接收跟todo有關的請求(Authorized)");
  next();
});

// 查詢所有待辦事項
router.get("/", async (req, res) => {
  try {
    let foundAllTodo = await Todo.find({});
    return res.send(foundAllTodo);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// 新增待辦事項
router.post("/", async (req, res) => {
  let { title, description } = req.body;
  // Joi驗證
  let { error, value } = todoValidation({ title, description });
  if (error) return res.status(400).send(error.details);
  // 新增資料
  try {
    let newTodo = new Todo({ title, description });
    await newTodo.save();
    return res.send("成功新增資料!");
  } catch (e) {
    return res.status(400).send("新增失敗");
  }
});

// 修改待辦事項
router.patch("/", async (req, res) => {});

// 刪除待辦事項

module.exports = router;
