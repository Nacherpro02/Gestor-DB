const express = require('express');
const router = express.Router();
const { register, login, search } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');


router.post('/register', register);
router.post('/login', login);
router.get('/search/:search', search);

router.get('/protected', verifyToken, (req, res) => {
  res.json({ msg: 'Valid token' });
});

module.exports = router;
