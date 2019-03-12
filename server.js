const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const passport = require('passport')
const cookieSession = require('cookie-session')
const keys = require('./config/keys')
var cors=require('cors');

const app = express();


//************Cookie session**************///
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  }))
  app.use(passport.initialize())
  app.use(passport.session());

  

//************Body parser middleware***********///
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//************ /DB config ***************//
const db = require('./config/keys').mongoURI;

//********** */Connect to MongoDB***********//
mongoose.connect(db)
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log(err)
)

app.get('/favico.ico', (req, res) => {
    res.sendStatus(404);
});


//**************     Use routes    *****************//
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get('/', (req, res) => {
    res.send('Hello')
})



//**************   Passport middleware   *****************//
app.use(passport.initialize());
//**************   Passport config   *****************//
require('./config/passport')(passport)



//***********Google auth route************///
app.get('/auth/google',
passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/dashboard')
    }
    );
  
///*************Logout Googleuser***************/
app.get('/auth/google/logout', (req, res)=> {
    req.logOut()
    res.redirect('/')
})
app.get('/auth/google/current_user', (req, res)=>{
    res.send(req.user)
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server runing'))