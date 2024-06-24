let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user-model");

let opts = {};
// opts.jwtFromRequest指定從哪裡獲取JWT。這裡使用的是ExtractJwt.fromAuthHeaderWithScheme()，即從請求標頭中的jwt Token提取。
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = (passport) => {
  // 使用JwtStrategy
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        let foundUser = await User.findOne({ _id: jwt_payload._id }).exec();
        if (foundUser) {
          return done(null, foundUser);
        } else {
          console.log("NofoundUser");
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    })
  );
};
