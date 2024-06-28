const router = require("express").Router();
const Todo = require("../models/todo-model");
const todoValidation = require("../validation").todoValidation;
const editTodoValidation = require("../validation").editTodoValidation;

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
  let { text, id, check, userID } = req.body;
  check = check === "true" || check === true;

  // Joi驗證
  let { error } = todoValidation({ text, id, check, userID });
  if (error) return res.status(400).send(error.details);
  // 新增資料
  try {
    let newTodo = new Todo({ text, id, check, userID });
    await newTodo.save();
    return res.send("成功新增資料!");
  } catch (e) {
    return res.status(400).send("新增失敗" + e);
  }
});

// 修改待辦事項 - todo的id作為params，通過jwt保護req.user.id就是userID
router.patch("/:id", async (req, res) => {
  let { text, check } = req.body;
  let { id } = req.params;
  try {
    let foundTodo = await Todo.findOne({ id, userID: req.user.id }).exec();
    if (!foundTodo || check != ("true" || "false")) {
      return res.status(500).send("發生未知錯誤。。。");
    }
    let { error } = editTodoValidation({ text, check });
    if (error) return res.status(400).send(error.details[0].message);
    //檢查是否有被修改
    if (text !== foundTodo.text || check !== toString(foundTodo.check)) {
      foundTodo.text = text;
      foundTodo.check = check;

      if (foundTodo.isModified("text")) {
        await foundTodo.save();
        return res.send("修改事項成功!");
      }
    }
    return res.send("沒有修改事項!");
  } catch (e) {
    return res.status(500).send(e);
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

module.exports = router;
