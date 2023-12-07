const db = require('../db/db')
const dateWib = require('../middleware/date')

const dataAlamat = (req, res) => {
    var id = req.params.id

    try {
        db.query(`
        SELECT
            user.iduser,
            user.name,
            alamat.notelp,
            alamat.alamats,
            alamat.alamat,
            alamat.rtrw,
            alamat.kelurahan,
            alamat.kecamatan,
            alamat.provinsi
        FROM alamat
        INNER JOIN user
            ON alamat.iduser = user.iduser
        WHERE user.iduser=?`, [id],
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

const inputAlamat = (req, res) => {
    var date = new Date()

    var post = {
        iduser: req.body.iduser,
        notelp: req.body.notelp,
        alamat: req.body.alamat,
        rtrw: req.body.rtrw,
        kelurahan: req.body.kelurahan,
        kecamatan: req.body.kecamatan,
        provinsi: req.body.provinsi,
        terdaftar: dateWib(date),
        terupdate: dateWib(date)
    }

    try {
        db.query(`INSERT INTO alamat (iduser, notelp, alamat, rtrw, kelurahan, kecamatan, provinsi, terdaftar, terupdate) VALUE (?,?,?,?,?,?,?,?,?)`,
            [post.iduser, post.notelp, post.alamat, post.rtrw, post.kelurahan, post.kecamatan, post.provinsi, post.terdaftar, post.terupdate],
            function (err, rows) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        data: err
                    })
                } else {
                    res.status(200).send({
                        status: true,
                        data: 'Data berhasil di input'
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

const updateAlamat = (req, res) => {
    var date = new Date()

    var update = {
        id: req.params.id,
        notelp: req.body.notelp,
        alamat: req.body.alamat,
        rtrw: req.body.rtrw,
        kelurahan: req.body.kelurahan,
        kecamatan: req.body.kecamatan,
        provinsi: req.body.provinsi,
        terupdate: dateWib(date)
    }

    try {
        db.query(`UPDATE alamat SET notelp=?, alamat=?, rtrw=?, kelurahan=?, kecamatan=?, provinsi=?, terupdate=? WHERE idalamat=?`,
            [update.notelp, update.alamat, update.rtrw, update.kelurahan, update.kecamatan, update.provinsi, update.terupdate, update.id],
            function (err, rows) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        data: err
                    })
                } else {
                    res.status(200).send({
                        status: true,
                        data: 'Data berhasil diupdate'
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

const deleteAlamat = (req, res) => {
    var id = req.params.id

    try {
        db.query(`DELETE FROM alamat WHERE idalamat=?`, [id],
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
    dataAlamat,
    inputAlamat,
    updateAlamat,
    deleteAlamat
}