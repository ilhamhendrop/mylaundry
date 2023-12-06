const db = require('../db/db')

const index = () => {
    return function (req, res) {
        return res.status(200).send({
            status: 200,
            data: "API SUCCES"
        })
    }
}

module.exports = index