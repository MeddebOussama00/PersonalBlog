const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json({extended: true}));// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded({extended: true}));//express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object f form (body) as strings or arrays.
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
  }));

const postRoutes = require('./routes/PostRoutes');
const UserRoutes =require('./routes/UserRoutes');
const { notfound, errorhundler } = require('./Middlewares/error');

app.use('/user', UserRoutes);
app.use('/post', postRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(notfound);
app.use(errorhundler);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
