const Workout = require('../models/workoutModel')
const mongoose =  require('mongoose')

//get workouts
const  getWorkouts = async (req,res) => {
    const workouts = await Workout.find({}).sort({createdAt : -1})
    res.status(200).json(workouts)
}

//get single workout
const getWorkout = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : ' No such workout'})
    }

    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(400).json({error : 'No such wokrout'})
    }

    res.status(200).json(workout)
}

//create new workout
const createWorkout = async(req,res) => {
    const {title, reps, load} = req.body

    //add to db
    try{
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    }
    catch(error)
    {
        res.status(400).json({error : error.message})
    }
}


//delete workout
const deleteWorkout = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : ' No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id : id})

    if(!workout){
        return res.status(400).json({error : 'No such wokrout'})
    }

    res.status(200).json(workout)
}


//update workout
const updateWorkout = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : ' No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id : id} , {...req.body})

    if(!workout){
        return res.status(400).json({error : 'No such wokrout'})
    }

    res.status(200).json(workout)
}

module.exports = { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout}