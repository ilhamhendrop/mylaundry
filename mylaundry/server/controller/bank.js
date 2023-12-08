const db = require('../db/db')
const dateWib = require('../middleware/date')

const dataBankAll = (req, res) => {
    try {
        db.query(`
            SELECT
                user.iduser,
                store.idstore,
                user.name,
                store.nama AS nama_store,
                bank.norek,
                bank.namabank,
                bank.nama AS nama_pemilik
            FROM bank
            INNER JOIN user
                ON bank.iduser = user.iduser
            INNER JOIN store
                ON bank.idstore = store.idstore 
            ORDER BY user.iduser`, function (err, rows) {
            if (err) {
                res.status(500).send({
                    status: false,
                    data: err
                })
            } else {
                res.status(200).send({
                    status: true,
                    data: rows
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            data: error
        })
    }
}

const dataCekBankId = (req, res) => {
    var id = req.params.id

    try {
        db.query(`
            SELECT
                user.iduser,
                store.idstore,
                user.name,
                store.nama AS nama_store,
                bank.norek,
                bank.namabank,
                bank.nama AS nama_pemilik
            FROM bank
            INNER JOIN user
                ON bank.iduser = user.iduser
            INNER JOIN store
                ON bank.idstore = store.idstore 
            WHERE user.iduser=?`, [id], function (err, rows) {
            if (err) {
                res.status(500).send({
                    status: false,
                    data: err
                })
            } else {
                res.status(200).send({
                    status: true,
                    data: rows
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            data: error
        })
    }
}

const dataBankStore = (req, res) => {
    var id = req.params.id

    try {
        db.query(`
            SELECT
                bank.idbank, 
                store.idstore,
                store.nama AS nama_store,
                bank.norek,
                bank.namabank,
                bank.nama AS nama_pemilik
            FROM bank
            INNER JOIN store
                ON bank.idstore = store.idstore 
            WHERE store.idstore=?`, [id], function (err, rows) {
            if (err) {
                res.status(500).send({
                    status: false,
                    data: err
                })
            } else {
                res.status(200).send({
                    status: true,
                    data: rows
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            data: error
        })
    }
}

const dataUserStore = (req, res) => {
    var id = req.params.id

    try {
        db.query(`
            SELECT 
                user.iduser,
                user.name,
                bank.norek,
                bank.namabank,
                bank.nama AS nama_pemilik
            FROM bank
            INNER JOIN user
                ON bank.iduser = user.iduser 
            WHERE user.iduser=?`, [id], function (err, rows) {
            if (err) {
                res.status(500).send({
                    status: false,
                    data: err
                })
            } else {
                res.status(200).send({
                    status: true,
                    data: rows
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            data: error
        })
    }
}

const inputBank = (req, res) => {
    var date = new Date()

    var post = {
        iduser: req.body.iduser,
        idstore: req.body.idstore,
        norek: req.body.norek,
        namabank: req.body.namabank,
        nama: req.body.nama,
        terdaftar: dateWib(date),
        terupdate: dateWib(date)
    }

    try {
        db.query(`INSERT INTO bank (iduser, idstore, norek, namabank, nama, terdaftar, terupdate) VALUE (?,?,?,?,?,?,?)`,
            [post.iduser, post.idstore, post.norek, post.namabank, post.nama, post.terdaftar, post.terupdate],
            function (err, rows) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        data: err
                    })
                } else {
                    res.status(200).send({
                        status: true,
                        data: 'Berhasil di input'
                    })
                }
            })
    } catch (error) {
        res.status(500).send({
            status: false,
            data: error
        })
    }
}

const updateBank = (req, res) => {
    var date = new Date()

    var update = {
        id: req.params.id,
        idstore: req.body.idstore,
        norek: req.body.norek,
        namabank: req.body.namabank,
        nama: req.body.nama,
        terupdate: dateWib(date)
    }

    try {
        db.query(`UPDATE bank SET idstore=?, norek=?, namabank=?, nama=?, terupdate=? WHERE idbank=?`,
            [update.idstore, update.norek, update.namabank, update.nama, update.terupdate, update.id],
            function (err, rows) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        data: err
                    })
                } else {
                    res.status(200).send({
                        status: true,
                        data: 'Berhasil di update'
                    })
                }
            })
    } catch (error) {
        res.status(500).send({
            status: false,
            data: error
        })
    }

}

const deleteBank = (req, res) => {
    var id = req.params.id

    try {
        db.query(`DELETE FROM bank WHERE idbank=?`, [id], function (err, rows) {
            if (err) {
                res.status(500).send({
                    status: false,
                    data: err
                })
            } else {
                res.status(200).send({
                    status: true,
                    data: 'Delete berhasil'
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            data: error
        })
    }
}

module.exports = {
    dataBankAll,
    dataBankStore,
    dataCekBankId,
    dataUserStore,
    inputBank,
    updateBank,
    deleteBank
}