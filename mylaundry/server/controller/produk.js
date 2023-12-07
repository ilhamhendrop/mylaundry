const db = require('../db/db')
const dateWib = require('../middleware/date')

const dataAllProduk = (req, res) => {
    var id = req.params.id
    try {
        db.query(`SELECT * FROM produk WHERE idstore=?`, [id],
            function (err, rows) {
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

const inputProduk = (req, res) => {
    var date = new Date()

    var post = {
        idstore: req.body.idstore,
        nama: req.body.nama,
        price: req.body.price,
        terdaftar: dateWib(date)
    }

    try {
        db.query(`INSERT INTO produk (idstore, nama, price, terdaftar) VALUE (?,?,?,?)`, [post.idstore, post.nama, post.price, post.terdaftar],
            function (err, rows) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        data: err
                    })
                } else {
                    res.status(200).send({
                        status: true,
                        data: 'Input Data Berhasil'
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

const updateProduk = (req, res) => {
    var update = {
        id: req.params.id,
        nama: req.body.nama,
        price: req.body.price,
    }

    try {
        db.query(`UPDATE produk SET nama=?, price=? WHERE idproduk=?`, [update.nama, update.price, update.id],
            function (err, rows) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        data: err
                    })
                } else {
                    res.status(200).send({
                        status: true,
                        data: 'Update data berhasil'
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

const deleteProduk = (req, res) => {
    var id = req.params.id

    try {
        db.query(`DELETE FROM produk WHERE idproduk=?`, [id], 
        function (err, rows) {
            if (err) {
                res.status(500).send({
                    status: false,
                    data: err
                })
            } else {
                res.status(200).send({
                    status: true,
                    data: 'Data berhasil dihapus'
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
    dataAllProduk,
    inputProduk,
    updateProduk,
    deleteProduk
}