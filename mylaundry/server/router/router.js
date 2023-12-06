const express = require('express');

const index = require('../respone/index')
const auth = require('../controller/auth')

const router = express.Router()

router.get('/', index)
router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)


module.exports = router