const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const passwordValidation = require("../validation").passwordValidation;
const passport = require("passport");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

router.use("/", (req, res, next) => {
  console.log("正在接收跟auth有關的請求");
  next();
});

// 註冊新用戶
router.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  // 使用Joi套件，在存取資料庫前進行資料驗證
  let { error, value } = registerValidation({ username, email, password });
  if (error)
    // console.log(error.details);
    return res.status(400).send(error.details[0].message);

  // 要註冊的email是否與資料庫內的重複
  const emailExist = await User.findOne({ email }).exec();
  if (emailExist) return res.status(400).send("此信箱已經被註冊過了。。");

  // 新增用戶
  let newUser = new User({ username, email, password });
  try {
    let savedUser = await newUser.save();
    return res.send({ message: "成功新增用戶!", savedUser });
  } catch (e) {
    return res.status(400).send(e);
  }
});

// 登入用戶
router.post("/login", async (req, res) => {
  let { username, email, password } = req.body;
  // 使用Joi套件，在存取資料庫前進行資料驗證
  let { error, value } = loginValidation({ email, password });
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否正確
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).send("無法找到使用者，請確認信箱是否正確。");
  }

  // 使用methods.comparePassword() 驗證密碼
  let isMatch = await foundUser.comparePassword(password);
  if (!isMatch) return res.status(400).send(isMatch);
  if (isMatch) {
    // 與DB中的密碼相符，驗證成功，製作JWT
    const payload = { _id: foundUser._id, email: foundUser.email };
    const token = jwt.sign(payload, process.env.SECRET);
    return res.send({
      token: "Bearer " + token,
    });
  } else {
    return res.status(401).send("密碼錯誤");
  }
});

// 修改用戶密碼
router.patch(
  "/change-password",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

// 刪除帳號
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await User.findByIdAndDelete({ _id: req.user._id }).exec();
      return res.send("刪除帳號成功!");
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

// 獲取當前用戶的資訊
router.get(
  "/getCurrentUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // 返回的資訊去掉密碼，因為是通過passport取得mongoose的資料所以要+._doc
    const { password, ...userWithoutPassword } = req.user._doc;
    return res.send(userWithoutPassword);
  }
);

// 驗證token
router.get(
  "/verifytoken",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({ success: true });
  }
);

module.exports = router;
