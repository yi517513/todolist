const router = require("express").Router();
const Todo = require("../models/todo-model");
const newTodoValidation = require("../validation").newTodoValidation;
const updateTodoValidation = require("../validation").updateTodoValidation;
const { syncTodos } = require("../controllers/todo.controller");

router.use("/", (req, res, next) => {
  console.log("正在接收跟todo有關的請求(Authorized)");
  next();
});

// 查詢所有待辦事項
router.get("/", async (req, res) => {
  try {
    let foundAllTodo = await Todo.find({}).exec();
    return res.send(foundAllTodo);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// 查詢特定id待辦事項
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundTodo = await Todo.findOne({ id: _id }).exec();
    return res.send(foundTodo);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// 查詢成功or失敗待辦事項
router.get("/check/:check", async (req, res) => {
  let { check } = req.params;
  check = check === true || check === "true";
  try {
    let foundTodo = await Todo.find({ check }).exec();
    return res.send(foundTodo);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// 新增待辦事項
router.post("/", async (req, res) => {
  let { text, todoID, check, userID, updateDate } = req.body;
  check = check === "true" || check === true;

  // Joi驗證
  let { error } = newTodoValidation({
    text,
    todoID,
    check,
    userID,
    updateDate,
  });
  if (error) return res.status(400).send(error.details);
  // 新增資料
  try {
    let newTodo = new Todo({ text, todoID, check, userID, updateDate });
    await newTodo.save();
    return res.send("成功新增資料!");
  } catch (e) {
    return res.status(400).send("新增失敗" + e);
  }
});

// 更新待辦事項
router.patch("/:todoID", async (req, res) => {
  let { text, todoID, check, userID, updateDate } = req.body;
  check = check === "true" || check === true;

  // Joi驗證
  let { error } = updateTodoValidation({
    text,
    todoID,
    check,
    userID,
    updateDate,
  });
  if (error) return res.status(400).send(error.details);

  // 更新資料
  try {
    let updatedTodo = await Todo.findOneAndUpdate(
      { todoID: req.params.todoID },
      { text, check, userID, updateDate },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).send("找不到此待辦事項");
    }
    return res.send("成功更新資料!");
  } catch (e) {
    return res.status(400).send("更新失敗: " + e);
  }
});

// 刪除待辦事項
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    await Todo.findByIdAndDelete({ _id }).exec();
    return res.send("成功刪除事項!");
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 同步todo
router.post("/sync", syncTodos);

module.exports = router;
