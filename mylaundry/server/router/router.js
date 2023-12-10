const express = require('express');

const index = require('../respone/index')
const auth = require('../controller/auth')
const store = require('../controller/store')
const produk = require('../controller/produk')
const alamat = require('../controller/alamat')
const bank = require('../controller/bank')
const order = require('../controller/pesan')
const verify = require('../middleware/verifikasi')

const router = express.Router()

router.get('/', index)
router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)

//admin
    //store
router.get('/admin/store/all', verify.admin, store.dataAdminStore)
router.get('/admin/store/data/:id', verify.admin, store.dataPemilikStore)
router.post('/admin/store/input', verify.admin, store.inputStore)
router.patch('/admin/store/update/:id', verify.admin, store.updateStore)
router.delete('/admin/store/delete/:id', verify.admin, store.deleteStore)
    //produk
router.get('/admin/produk/:id', verify.admin, produk.dataAllProduk)
router.post('/admin/produk/input', verify.admin, produk.inputProduk)
router.patch('/admin/produk/update/:id', verify.admin, produk.updateProduk)
router.delete('/admin/produk/delete/:id', verify.admin, produk.deleteProduk)
    //alamat
router.get('/admin/alamat/:id', verify.admin, alamat.dataAlamat)
router.post('/admin/alamat/input', verify.admin, alamat.inputAlamat)
router.patch('/admin/alamat/update/:id', verify.admin, alamat.updateAlamat)
router.delete('/admin/alamat/delete/:id', verify.admin, alamat.deleteAlamat)
    //bank
router.get('/admin/bank/all', verify.admin, bank.dataBankAll)
router.get('/admin/bank/pemilik/:id', verify.admin, bank.dataCekBankId)
router.get('/admin/bank/store/:id', verify.admin, bank.dataBankStore)
router.get('/admin/bank/user/:id', verify.admin, bank.dataUserStore)
router.post('/admin/bank/input', verify.admin, bank.inputBank)
router.patch('/admin/bank/update/:id', verify.admin, bank.updateBank)
router.delete('/admin/bank/delete/:id', verify.admin, bank.deleteBank)
    //order
router.get('/admin/order/all', verify.admin, order.dataAdminPesan)
router.get('/admin/order/:id', verify.admin, order.dataUserPesan)
router.post('/admin/order/input', verify.admin, order.inputPesan)
router.patch('/admin/order/update/:id', verify.admin, order.updateStatusOder)

//pemilik
router.get('/pemilik/store/:id', verify.pemilik, store.dataPemilikStore)
router.post('/pemilik/store/input', verify.pemilik, store.inputStore)
router.patch('/pemilik/store/update/:id', verify.pemilik, store.updateStore)
router.delete('/pemilik/store/delete/:id', verify.pemilik, store.deleteStore)

router.get('/pemilik/produk/:id', verify.pemilik, produk.dataAllProduk)
router.post('/pemilik/produk/input', verify.pemilik, produk.inputProduk)
router.patch('/pemilik/produk/update/:id', verify.pemilik, produk.updateProduk)
router.delete('/pemilik/produk/delete/:id', verify.pemilik, produk.deleteProduk)

router.get('/admin/order/all', verify.pemilik, order.dataPemilikStore)

//user
router.get('/store', verify.user, store.dataUserStore)
router.get('/produk/:id', verify.user, produk.dataAllProduk)


module.exports = router