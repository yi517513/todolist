const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

router.use("/", (req, res, next) => {
  console.log("正在接收跟auth有關的請求");
  next();
});

router.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  // 使用Joi套件，在存取資料庫前進行資料驗證
  let { error, value } = registerValidation({ username, email, password });
  if (error)
    // console.log(error.details);
    return res.status(400).send(error.details[0].message);

  // 要註冊的email是否與資料庫內的重複
  const emailExist = await User.findOne({ email });
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

router.post("/login", async (req, res) => {
  let { username, email, password } = req.body;
  // 使用Joi套件，在存取資料庫前進行資料驗證
  let { error, value } = loginValidation({ email, password });
  if (error) return res.status(400).send(error.details);

  // 確認信箱是否正確
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(401).send("無法找到使用者，請確認信箱是否正確。");
  }

  // 使用methods.comparePassword() 驗證密碼
  foundUser.comparePassword(password, (err, isMatch) => {
    if (err) return res.status(400).send(err);
    if (isMatch) {
      // 與DB中的密碼相符，驗證成功，製作JWT
      const payload = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(payload, process.env.SECRET);
      return res.send({
        message: "登入成功",
        token: "Bearer " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});

module.exports = router;
