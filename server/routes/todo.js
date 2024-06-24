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
    let foundAllTodo = await Todo.find({}).exec();
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
router.patch("/:_id", async (req, res) => {
  let { title, description } = req.body;
  let { _id } = req.params;
  try {
    let foundTodo = await Todo.findOne({ _id }).exec();
    if (!foundTodo) {
      return res.status(404).send("不存在待辦事項");
    }
    let { error } = todoValidation({ title, description });
    if (error) return res.status(400).send(error.details[0].message);

    //檢查是否有被修改
    if (title && title !== foundTodo.title) {
      foundTodo.title = title;
    }
    if (description && description !== foundTodo.description) {
      foundTodo.description = description;
    }
    let isModified =
      foundTodo.isModified("title") || foundTodo.isModified("description");
    if (isModified) {
      await foundTodo.save();
      return res.send("修改事項成功!");
    } else {
      return res.send("沒有修改事項!");
    }
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
