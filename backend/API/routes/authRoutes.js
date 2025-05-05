const express = require('express');
const router = express.Router();
const { register, login, search, addcliente, getCode, verifyCode, resetPassword } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');


router.post('/register', register);
router.post('/login', login);
router.get('/search/:search', search);
router.post('/addcliente', addcliente)
router.post('/getcode', getCode)
router.post('/verifycode', verifyCode)
router.post('/resetpassword', resetPassword)
router.get('/protected', verifyToken, (req, res) => {
  res.json({ msg: 'Valid token' });
});

module.exports = router;
