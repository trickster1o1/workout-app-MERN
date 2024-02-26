const express = require("express");
const {createWorkout, workoutDetail, getWorkouts, updateWorkout, deleteWorkout} = require('../controllers/workouts');

const router = express.Router();
router.get("/", getWorkouts);

router.get("/:id", workoutDetail);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
