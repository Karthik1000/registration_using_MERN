const express = require('express');

const connectDB = require('./config/db');

const app = express();

//connect MongoDB
connectDB();

app.get('/', (req, res) => res.send('API running !!!'));

//Middleware for access to req.body

app.use(express.json({ extend: false }));

//routes
app.use('/api/users', require('./routes/api/users'));

app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/posts', require('./routes/api/posts'));

app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000; //heroku runs star script in package.json file. The PORT variable in env is also for heroku

app.listen(PORT, () => console.log(`server started at ${PORT}`));
