const express = require("express");
const {
  randomRegisterController,
  randomLoginController,
  getUser,
  aws,
  autoCreateUsers,
  getAdminUsers,
  
} = require("../controllers/randomAuthController");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", randomRegisterController);
router.post("/login", randomLoginController);
router.post('/get-user',getUser);
router.get("sign", requireSignIn);
router.post('/set_users',autoCreateUsers);
router.post('/getadminusers',getAdminUsers)

module.exports = router;
