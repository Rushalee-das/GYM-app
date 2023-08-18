const express = require('express')
const mongose = require('mongoose')
require('dotenv').config()

const app = express()
const workoutRoute = require('./route/Workouts')

app.use(express.json())

app.use((req, res, next) => {
    console.log('Path:', req.path);
    console.error('Method:', req.method);
    next();
});

app.use('/api/workout', workoutRoute)

mongose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(4000, () => {
            console.log("connected to db and port is listening on 4000")
        }) 
    })
    .catch((error) =>{
        console.log(error);
    })

