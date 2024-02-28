import { useEffect } from "react";
import Workout from "../components/workout";
import WorkoutForm from "../components/workoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const getWorkout = async () => {
      await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
              dispatch({ type: "SET_WORKOUTS", payload: [] });
            console.log(res);
          } else {
            dispatch({ type: "SET_WORKOUTS", payload: res });
          }
        })
        .catch((e) => console.log(e));
    };
    if (user) {
      getWorkout();
    }
    console.log("working...");
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts ? workouts.length ? (
          workouts.map((w) => <Workout key={w._id} workout={w} />)
        ) : <h3>No Workouts Yet</h3> : (
          <p>Loading.</p>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}
