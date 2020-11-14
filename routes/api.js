const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()
require('../config/passport')(passport)
const Product = require('../models').Product
const User = require('../models').User

// signup
router.post('/signup', function(req,res) {
    console.log(req.body)
    if (!req.body.username || !req.body.password) {
        res.status(400).send({msg: 'Please enter username and password'})
    } else {
        User.create({
            username: req.body.username,
            password: req.body.password
        })
        .then(() => res.status(201).send("Registration success"))
        .catch((error) => {
            console.log(error)
            res.status(400).send(error)
        })
    }
})

// signin
router.post('/signin', function(req, res) {
    User.findOne({
        where: {username: req.body.username}
    })
    .then((user) => {
        if (!user) {
            return res.status(401).send({
                message: 'Authentication failed. User not found.',
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30})
                jwt.verify(token, 'nodeauthsecret', (err, data) => {
                    console.log(err, data)
                })
                res.json({success: true, token: 'JWT '+token})
            } else {
                res.status(401).send({message: false, msg: 'Authentication failed. Wrong Password.'})
            }
        })
    })
    .catch((error) => res.status(400).send(error))
})

// get product
router.get('/product', passport.authenticate('jwt', {session: false}), function(req, res) {
    var token = getToken(req.headers)
    if (token) {
        Product
        .findAll()
        .then((products) => res.status(200).send(products))
        .catch((error) => { res.status(400).send(error) })
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
    }
})

// save product
router.post('/product', passport.authenticate('jwt', {session: false}), function(req, res) {
    var token = getToken(req.headers)
    if (token) {
        Product
        .create({
            prod_name: req.body.prod_name,
            prod_desc: req.body.prod_desc,
            prod_price: req.body.prod_price,
        })
        .then((product) => res.status(201).send(product))
        .catch((error) => res.status(400).send(error))
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
    }
})

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ')
        if (parted.length === 2) {
            return parted[1]
        } else {
            return null
        }
    } else {
        return null
    }
}

module.exports = router