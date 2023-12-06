const db = require('../db/db')
const dateWib = require('../middleware/date')

const dataAdminStore = (req, res) => {
    try {
        db.query(`
            SELECT
                user.iduser,
                user.name,
                store.nama,
                store.alamat,
                store.rtrw,
                store.kelurahan,
                store.kecamatan,
                store.provinsi
            FROM store 
            INNER JOIN user
                ON store.iduser = user.iduser
            ORDER BY user.iduser`,
            function (err, rows, fields) {
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
    try {
        db.query('SELECT * FROM store', function (err, rows) {
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

const inputStore = (req, res) => {
    var date = new Date()

    var post = {
        iduser: req.body.iduser,
        nama: req.body.nama,
        alamat: req.body.alamat,
        rtrw: req.body.rtrw,
        kelurahan: req.body.kelurahan,
        kecamatan: req.body.kecamatan,
        provinsi: req.body.provinsi,
        terdaftar: dateWib(date)
    }

    try {
        db.query(`INSERT INTO store (iduser, nama, alamat, rtrw, kelurahan, kecamatan, provinsi, terdaftar) 
        VALUE (?,?,?,?,?,?,?,?)`, [post.iduser, post.nama, post.alamat, post.rtrw, post.kelurahan, post.kecamatan, post.provinsi, post.terdaftar],
            function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        data: err
                    })
                } else {
                    res.status(200).send({
                        status: true,
                        data: 'Data Berhasil Di Input'
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

const dataPemilikStore = (req, res) => {
    var iduser = req.params.iduser

    try {
        db.query(`SELECT * FROM store WHERE iduser=?`, [iduser],
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

const updateStore = (req, res) => {
    var post = {
        id: req.params.id,
        nama: req.body.nama,
        alamat: req.body.alamat,
        rtrw: req.body.rtrw,
        kelurahan: req.body.kelurahan,
        kecamatan: req.body.kecamatan,
        provinsi: req.body.provinsi,
        terdaftar: dateWib(date)
    }

    try {
        db.query(`UPDATE store SET nama=?, alamat=?, rtrw=?, kelurahan=?, kecamatan=?, provinsi=? WHERE iduser=?`,
            [post.nama, post.alamat, post.rtrw, post.kelurahan, post.kecamatan, post.provinsi, post.id],
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

const deleteStore = (req, res) => {
    var hapus = {
        idstore: req.params.idstore
    }

    try {
        db.query(`DELETE FROM store idstore=?`, [hapus.iduser, hapus.idstore],
            function (err, rows) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        data: err
                    })
                } else {
                    res.status(200).send({
                        status: true,
                        data: 'Data berhasil terhapus'
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
    dataAdminStore,
    dataUserStore,
    inputStore,
    dataPemilikStore,
    updateStore,
    deleteStore
}