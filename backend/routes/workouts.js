const express = require("express");
const {createWorkout, workoutDetail, getWorkouts} = require('../controllers/workouts');

const router = express.Router();
router.get("/", getWorkouts);

router.get("/:id", workoutDetail);

router.post("/", createWorkout);

router.delete("/:id", (req, res) => {
  res.json({ msg: "delete workout" });
});

router.patch("/:id", (req, res) => {
  res.json({ msg: "update workout" });
});

module.exports = router;
