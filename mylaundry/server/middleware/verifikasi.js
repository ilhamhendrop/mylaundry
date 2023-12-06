const jwt = require('jsonwebtoken')
const config = require('../config/secret')

const admin = () => {
    return function (req, res, next) {
        var role = req.body.role
        var tokenWithBearer = req.headers.authorization
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1]
            jwt.verify(token, config.secret, function (err, decoded, authData) {
                if (err) {
                    return res.status(401).send({ auth: false, message: 'Token tidak terdaftar' })
                } else {
                    if (role == 1) {
                        req.auth = decoded
                        next()
                    } else {
                        return res.status(401).send({ auth: false, message: 'Gagal masuk' })
                    }
                }
            })
        } else {
            return res.status(401).send({ auth: false, message: 'Token tidak tersedia' })
        }
    }
}

const pemilik = () => {
    return function (req, res, next) {
        var role = req.body.role
        var tokenWithBearer = req.headers.authorization
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1]
            jwt.verify(token, config.secret, function (err, decoded, authData) {
                if (err) {
                    return res.status(401).send({ auth: false, message: 'Token tidak terdaftar' })
                } else {
                    if (role == 2) {
                        req.auth = decoded
                        next()
                    } else {
                        return res.status(401).send({ auth: false, message: 'Gagal masuk' })
                    }
                }
            })
        } else {
            return res.status(401).send({ auth: false, message: 'Token tidak tersedia' })
        }
    }
}

const user = () => {
    return function (req, res, next) {
        var role = req.body.role
        var tokenWithBearer = req.headers.authorization
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1]
            jwt.verify(token, config.secret, function (err, decoded, authData) {
                if (err) {
                    return res.status(401).send({ auth: false, message: 'Token tidak terdaftar' })
                } else {
                    if (role == 3) {
                        req.auth = decoded
                        next()
                    } else {
                        return res.status(401).send({ auth: false, message: 'Gagal masuk' })
                    }
                }
            })
        } else {
            return res.status(401).send({ auth: false, message: 'Token tidak tersedia' })
        }
    }
}

module.exports = {
    admin,
    pemilik,
    user
}