import { useEffect } from "react";
import Workout from "../components/workout";
import WorkoutForm from "../components/workoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export default function Home() {
    const {workouts,dispatch} = useWorkoutsContext();
    useEffect(()=> {
        const getWorkout = async () => {
            await fetch('/api/workouts')
            .then((res)=>res.json())
            .then((res)=> {
                dispatch({type: 'SET_WORKOUTS', payload: res});
            }).catch((e)=>console.log(e));
        }
        getWorkout();
        console.log('working...');
    }, []);
    return (
        <div className="home">
            <div className="workouts">
                {workouts ? workouts.map((w)=>(
                    <Workout key={w._id} workout={w} />
                )) : <p>Working</p>}
            </div>
            <WorkoutForm />
        </div>
    );
}