const express = require('express');
const { randomRegisterController,randomLoginController,aws } = require('../controllers/randomAuthController');
const {requireSignIn} = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/register',randomRegisterController);
router.post('/login',randomLoginController);
router.get('sign',requireSignIn);
router.get('/aws',aws);


module.exports=router;