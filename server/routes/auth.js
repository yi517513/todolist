const router = require("express").Router();

router.get("/", (req, res, next) => {
  console.log("正在接收跟auth有關的請求");
  res.send("已接收跟auth有關的請求");
  next();
});

module.exports = router;
