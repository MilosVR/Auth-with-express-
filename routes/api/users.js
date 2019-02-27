const express = require('express');
const User = require('../../models/User')

//***************Create express Router**************//
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
// app.use('/api/users', users); na ovaj route dodaje se /test i to je onda
// /api/users/test @route   GET api/users/test @acces   Public

router.get('/test', (req, res) => {
    res.json({msg: "Users works"})
})

// @route   GET api/users/register @acces   Public

router.post('/register', (req, res) => {
    //finOne is mongo method who is use the promise
    User
        .findOne({email: req.body.email})
        .then(user => {
            if (user) {
                //if exist user this email
                return res
                    .status(400)
                    .json({email: "Email already exists"})
            } else {
                // Kada kreiramo resource sa mongoose, kreiramo ga sa new i onda model name(nas
                // model je User) i onda prosledjujemo data kao object.

                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //Rating
                    d: 'mm' //default
                });

                const newUser = new User({name: req.body.name, email: req.body.email, password: req.body.password, avatar});

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err
                        }
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

// @route   GET api/users/login @desc    loging user/return jwt token @acces
// Public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User
        .findOne({email: email})
        .then(user => {
            //Check for user
            if (!user) {
                return res
                    .status(404)
                    .json({email: 'User not found'})
            }
            //Check password first arg is plain text password, secund is hash pass
            bcrypt.compare(password, user.password)
            // this is gonna retutn true or false, if is true user is pass login and this is
            // the place that we generate the token
                .then(isMatch => {

                //Create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                }

                if (isMatch) {
                    jwt.sign(payload, keys.secret, {
                        expiresIn: 36000
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                    })
                } else {
                    return res
                        .status(400)
                        .json({password: "Password incorrect"})
                }
            })
        })

})

// @route   GET api/users/current @desc    Return current user @acces   Private
router.get('/current', 
    passport.authenticate('jwt', {session: false}), 
    (req, res) => {
   res.json({
       id : req.user.id,
       name : req.user.name,
       email : req.user.email
   }) 
})

module.exports = router