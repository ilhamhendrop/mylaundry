const db = require('../db/db')
const dateWib = require('../middleware/date')

const dataAdminPesan = (req, res) => {
    try {
        db.query(`
            SELECT
                user.iduser,
                user.name,
                address.notelp,
                address.alamat,
                address.rtrw,
                address.kelurahan,
                address.kecamatan,
                address.provinsi,
                store.nama AS namastore,
                produk.nama AS namaproduk,
                produk.price,
                bank.namabank,
                bank.norek,
                jumlah AS jumlahpesan,
                total,
                status
            FROM pesan
            INNER JOIN user
                ON pesan.iduser = user.iduser
            INNER JOIN address
                ON pesan.idaddress = address.idaddress
            INNER JOIN store
                ON pesan.idstore = store.idstore
            INNER JOIN produk
                ON pesan.idstore = produk.idstore
            INNER JOIN bank
                ON pesan.idbank = bank.idbank
            ORDER BY user.iduser`, function (err, rows) {
            if (err) {
                res.status(500).json({
                    status: false,
                    data: err
                })
            } else {
                res.status(200).json({
                    status: true,
                    data: rows
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            data: error
        })
    }
}

const dataUserPesan = (req, res) => {
    const id = req.params.id

    try {
        db.query(`
            SELECT
                user.iduser,
                user.name,
                address.notelp,
                address.alamat,
                address.rtrw,
                address.kelurahan,
                address.kecamatan,
                address.provinsi,
                store.nama AS namastore,
                produk.nama AS namaproduk,
                produk.price,
                bank.namabank,
                bank.norek,
                jumlah AS jumlahpesan,
                total,
                status
            FROM pesan
            INNER JOIN user
                ON pesan.iduser = user.iduser
            INNER JOIN address
                ON pesan.idaddress = address.idaddress
            INNER JOIN store
                ON pesan.idstore = store.idstore
            INNER JOIN produk
                ON pesan.idstore = produk.idstore
            INNER JOIN bank
                ON pesan.idbank = bank.idbank
            WHERE user.iduser=?`, [id], function (err, rows) {
            if (err) {
                res.status(500).json({
                    status: false,
                    data: err
                })
            } else {
                res.status(200).json({
                    status: true,
                    data: rows
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error
        })
    }
}

const dataPemilikStore = (req, res) => {
    try {
        db.query(`
            SELECT
                user.iduser,
                user.name,
                address.notelp,
                address.alamat,
                address.rtrw,
                address.kelurahan,
                address.kecamatan,
                address.provinsi,
                store.nama AS namastore,
                produk.nama AS namaproduk,
                produk.price,
                bank.namabank,
                bank.norek,
                jumlah AS jumlahpesan,
                total,
                status
            FROM pesan
            INNER JOIN user
                ON pesan.iduser = user.iduser
            INNER JOIN address
                ON pesan.idaddress = address.idaddress
            INNER JOIN store
                ON pesan.idstore = store.idstore
            INNER JOIN produk
                ON pesan.idstore = produk.idstore
            INNER JOIN bank
                ON pesan.idbank = bank.idbank
            ORDER BY user.iduser`, function (err, rows) {
            if (err) {
                res.status(500).json({
                    status: false,
                    data: err
                })
            } else {
                res.status(200).json({
                    status: true,
                    data: rows
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            data: error
        })
    }
}

const inputPesan = (req, res) => {
    var date = new Date()

    var post = {
        iduser: req.body.iduser,
        idstore: req.body.idstore,
        idproduk: req.body.idproduk,
        idaddress: req.body.idaddress,
        idbank: req.body.idbank,
        jumlah: req.body.jumlah,
        total: req.body.total,
        status: req.body.status,
        terdaftar: dateWib(date),
        terupdate: dateWib(date)
    }

    try {
        db.query(`INSERT INTO pesan (iduser, idstore, idproduk, idaddress, idbank, jumlah, total, status, terdaftar, terupdate)
            VALUE (?,?,?,?,?,?,?,?,?,?)`,
            [post.iduser, post.idstore, post.idproduk, post.idaddress, post.idbank, post.jumlah, post.total, post.status, post.terdaftar, post.terupdate],
            function (err, rows) {
                if (err) {
                    res.status(500).json({
                        status: false,
                        data: err
                    })
                } else {
                    res.status(200).json({
                        status: true,
                        data: 'Berhasil order'
                    })
                }
            })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error
        })
    }
}

const updateStatusOder = (req, res) => {
    var date = new Date()

    var update = {
        id: req.params.id,
        status: req.body.status,
        terupdate: dateWib(date)
    }

    try {
        db.query(`UPDATE pesan SET status=?, terupdate=? WHERE iduser=?`,
            [update.status, update.terupdate, update.id], function (err, rows) {
                if (err) {
                    res.status(500).json({
                        status: false,
                        data: err
                    })
                } else {
                    res.status(200).json({
                        status: true,
                        data: 'Berhasil update'
                    })
                }
            })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error
        })
    }
}

module.exports = {
    dataAdminPesan,
    dataUserPesan,
    dataPemilikStore,
    inputPesan,
    updateStatusOder,
}