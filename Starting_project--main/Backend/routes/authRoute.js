const express = require("express");
const {
  randomRegisterController,
  randomLoginController,
  getUser,
  aws,
  
} = require("../controllers/randomAuthController");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", randomRegisterController);
router.post("/login", randomLoginController);
router.post('/get-user',getUser);
router.get("sign", requireSignIn);

module.exports = router;
