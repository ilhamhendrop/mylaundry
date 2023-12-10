const jwt = require('jsonwebtoken')
const config = require('../config/secret')

const admin = (req, res, next) => {
    var role = req.body.role
    var tokenWithBearer = req.headers.authorization

    if (tokenWithBearer) {
        var token = tokenWithBearer.split(' ')[1]
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).send({
                    status: false,
                    data: "Token tidak terdaftar"
                })
            } else {
                if (role == 1) {
                    req.auth = decoded
                    next()
                } else {
                    return res.status(401).send({
                        status: false,
                        message: 'Gagal masuk'
                    })
                }
            }
        })
    } else {
        return res.status(401).send({
            status: false,
            data: "Token tidak tersedia"
        })
    }
}

const pemilik = (req, res, next) => {
    var role = req.body.role
    var tokenWithBearer = req.headers.authorization

    if (tokenWithBearer) {
        var token = tokenWithBearer.split(' ')[1]
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).send({
                    status: false,
                    data: "Token tidak terdaftar"
                })
            } else {
                if (role == 2) {
                    req.auth = decoded
                    next()
                } else {
                    return res.status(401).json({
                        status: false,
                        message: 'Gagal masuk'
                    })
                }
            }
        })
    } else {
        return res.status(401).json({
            status: false,
            data: "Token tidak tersedia"
        })
    }
}

const user = (req, res, next) => {
    var role = req.body.role
    var tokenWithBearer = req.headers.authorization

    if (tokenWithBearer) {
        var token = tokenWithBearer.split(' ')[1]
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    status: false,
                    data: "Token tidak terdaftar"
                })
            } else {
                if (role == 3) {
                    req.auth = decoded
                    next()
                } else {
                    return res.status(401).json({
                        status: false,
                        message: 'Gagal masuk'
                    })
                }
            }
        })
    } else {
        return res.status(401).json({
            status: false,
            data: "Token tidak tersedia"
        })
    }
}

module.exports = {
    admin,
    pemilik,
    user
}