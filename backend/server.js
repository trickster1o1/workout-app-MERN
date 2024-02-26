require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const app = express();
const workoutRoutes = require('./routes/workouts');

// middleware
app.use(express.json());

app.use((req, res, next)=> {
    console.log(req.path, req.method);
    next();
});

// Routes...
app.use('/api/workouts',workoutRoutes);

// DB
mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('listening on port 4000');
    });    
}).catch((e)=>console.log(e));
