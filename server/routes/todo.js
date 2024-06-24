const router = require("express").Router();
const Todo = require("../models/todo-model");

router.use("/", (req, res, next) => {
  console.log("正在接收跟todo有關的請求(Authorized)");
  next();
});

router.get("/", (req, res) => {
  return res.send("正在/todo route(Authorized)");
});

// 新增待辦事項
router.post("/", async (req, res) => {
  let { data } = req.body;
  // JWT是否驗證成功

  // JWT符合，新增資料
  try {
    let newTodo = new Todo({ data });
    await newTodo.save();
    return res.send("成功新增資料!");
  } catch (e) {
    return res.status(400).send("新增失敗");
  }
});

module.exports = router;
