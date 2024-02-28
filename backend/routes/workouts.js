const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {createWorkout, workoutDetail, getWorkouts, updateWorkout, deleteWorkout} = require('../controllers/workouts');

const router = express.Router();

// Middleware
router.use(requireAuth);

router.get("/", getWorkouts);

router.get("/:id", workoutDetail);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
