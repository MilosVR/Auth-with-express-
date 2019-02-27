const express = require('express');
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

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

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get('/', (req, res) => {
    res.send('Hello')
})

//**************/Use routes*****************//



const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server runing'))