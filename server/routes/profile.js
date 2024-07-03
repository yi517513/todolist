const router = require("express").Router();
const passwordValidation = require("../validation").passwordValidation;
const Todo = require("../models/todo-model");
const User = require("../models/user-model");

router.use("/", (req, res, next) => {
  console.log("正在接收跟profile有關的請求");
  next();
});

// 獲取當前用戶的資料
router.get("/", async (req, res) => {
  // 返回的資訊去掉密碼，因為是通過passport取得mongoose的資料所以要+._doc
  const { password, ...userWithoutPassword } = req.user._doc;
  const completedTasks = await Todo.countDocuments({
    userID: req.user._id,
    check: true,
  });
  const inCompletedTasks = await Todo.countDocuments({
    userID: req.user._id,
    check: false,
  });
  return res.send({ ...userWithoutPassword, completedTasks, inCompletedTasks });
});

// 變更用戶密碼
router.patch("/changPassword", async (req, res) => {
  let newPassword = req.body.password;
  let foundUser = await User.findOne({ _id: req.user._id }).exec();

  // joi
  let { error } = passwordValidation({ password: newPassword });
  if (error) return res.status(400).send(error.details[0].message);

  // 檢查新密碼是否與舊密碼相同
  let isMatch = await foundUser.comparePassword(newPassword);
  if (isMatch) return res.status(400).send("請勿使用重複的密碼!");

  // 更新密碼
  try {
    foundUser.password = newPassword;
    // save()前會進入pre("save")這個middleware，當密碼isNew or isModified就會hash
    await foundUser.save();
    return res.send("密碼更新成功!");
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

// 刪除帳號
router.delete("/", async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.user._id }).exec();
    return res.send("刪除帳號成功!");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
