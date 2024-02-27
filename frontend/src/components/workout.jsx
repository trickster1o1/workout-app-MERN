import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function Workout({ workout }) {
    const {dispatch} = useWorkoutsContext();
    const delWorkout = async () => {
        await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE'
        }).then(res=>res.json()).then(res=>{
            if(!res.error) {
                dispatch({type: 'DELETE_WORKOUT', payload: res});
            }
            console.log(res);
        }).catch(e=>console.log(e));
    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong> {workout.load}</p>
            <p><strong>Reps (kg): </strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={delWorkout}>Delete</span>
        </div>
    );
}