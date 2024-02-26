const Workout = require("../models/workouts");
const mongoose = require('mongoose');

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
}

const workoutDetail = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Workout'});
    }
    const workout = await Workout.findById(id);
    if(!workout) {
        return res.status(404).json({error: 'No Such Workout'});
    }
    res.status(200).json(workout);
}

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
    createWorkout, getWorkouts, workoutDetail
};