const express = require('express');

const index = require('../respone/index')
const auth = require('../controller/auth')
const store = require('../controller/store')
const verify = require('../middleware/verifikasi')

const router = express.Router()

router.get('/', index)
router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)

//admin
router.get('/admin/store/all', verify.admin, store.dataAdminStore)
router.get('/admin/store/data/:id', verify.admin, store.dataPemilikStore)
router.post('/admin/store/input', verify.admin, store.inputStore)
router.patch('/admin/store/update/:id', verify.admin, store.updateStore)
router.delete('/admin/store/delete/:id', verify.admin, store.deleteStore)

//pemilik
router.get('/pemilik/store/:id', verify.pemilik, store.dataPemilikStore)
router.post('/pemilik/store/input', verify.pemilik, store.inputStore)
router.patch('/pemilik/store/update/:id', verify.pemilik, store.updateStore)
router.delete('/pemilik/store/delete/:id', verify.pemilik, store.deleteStore)

//user
router.get('/store', verify.user, store.dataUserStore)


module.exports = router