const express = require('express');
const { randomRegisterController,randomLoginController } = require('../controllers/randomAuthController');
const {requireSignIn} = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/register',randomRegisterController);
router.post('/login',randomLoginController);
router.get('sign',requireSignIn);


module.exports=router;