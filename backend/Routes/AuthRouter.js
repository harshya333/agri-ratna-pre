const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const upload = require("../Middlewares/Uploads");



const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation,upload.single("image"), signup);

module.exports = router;