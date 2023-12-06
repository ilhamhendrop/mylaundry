const db = require('../db/db')
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const md5 = require('md5')
const config = require('../config/secret')

const register = (req, res) => {
    var date = new Date()

    var registers = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        password: md5(req.body.password, 10),
        role: req.body.role,
        terdaftar: dateWib(date)
    }

    function dateWib(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    }

    var query = `SELECT email FROM ?? WHERE ??=?`
    var table = ["user", "email", registers.email]
    query = mysql.format(query, table)
    db.query(query, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            if (rows.length == 0) {
                var query = `INSERT INTO ?? SET ?`
                var table = ["user"]
                query = mysql.format(query, table)
                db.query(query, registers, function (err, rows) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.status(200).send({
                            status: true,
                            data: "Berhasil Mendaftar"
                        })
                    }
                })
            } else {
                res.status(200).send({
                    status: false,
                    data: "Email sudah terdaftar!!"
                })
            }
        }
    })
}

const login = (req, res) => {
    var post = {
        email: req.body.email,
        password: req.body.password
    }

    var query = `SELECT * FROM ?? WHERE ??=? AND ??=?`
    var table = ['user', 'email', post.email, 'password', md5(post.password)]

    query = mysql.format(query, table)
    db.query(query, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: "1Days"
                })

                iduser = rows[0].iduser
                var data = {
                    iduser: iduser,
                    token: token,
                }

                var query_insertToken = `INSERT INTO ?? SET ?`
                var query_tableInsert = ["akses_token"]

                var query_selectToken = `SELECT iduser FROM ?? WHERE ??=?`
                var query_tableSelect = ['akses_token', 'iduser', iduser]

                var query_updateToken = `UPDATE ?? SET ??=? WHERE ??=?`
                var query_tableUpdate = ['akses_token', 'token', data.token, 'iduser', data.iduser]

                query_selectToken = mysql.format(query_selectToken, query_tableSelect)
                db.query(query_selectToken, function (err, rows) {
                    if (err) {
                        console.log(err)
                    } else if (rows.length == 0) {
                        query_insertToken = mysql.format(query_insertToken, query_tableInsert)
                        db.query(query_insertToken, data, function (err, rows) {
                            if (err) {
                                console.log(err)
                            } else {
                                res.json({
                                    status: true,
                                    token: token,
                                    currUser: data.iduser
                                })
                            }
                        })
                    } else {
                        query_updateToken = mysql.format(query_updateToken, query_tableUpdate)
                        db.query(query_updateToken, data, function (err, rows) {
                            if (err) {
                                console.log(err)
                            } else {
                                res.json({
                                    status: true,
                                    token: token,
                                    currUser: data.iduser
                                })
                            }
                        })
                    }
                })
            } else {
                res.json({
                    status: false,
                    data: "Email atau Password salah"
                })
            }
        }
    })
}

module.exports = {
    register,
    login
}
