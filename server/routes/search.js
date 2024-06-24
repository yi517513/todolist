const router = require("express").Router();
const Todo = require("../models/todo-model");

router.use("/", (req, res, next) => {
  console.log("正在接收跟search有關的請求(Authorized)");
  next();
});

// 依照title或description查詢待辦事項
router.get("/search/:query", async (req, res) => {
  let { query } = req.params;
  try {
    // 使用正則表達式來實現部分匹配，且忽略大小寫
    let foundTodos = await Todo.find({
      $or: [
        { title: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
      ],
    }).exec();
    if (foundTodos.length === 0) {
      return res.status(404).send("找不到符合條件的待辦事項");
    }
    return res.send(foundTodos);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 查詢指定日期的待辦事項
router.get("/date/:date", async (req, res) => {
  let { date } = req.params;
  try {
    let foundTodos = await Todo.find({ date }).exec();
    if (foundTodos) {
      return res.send(foundTodos);
    } else {
      return res.status(404).send("查無資料!");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
