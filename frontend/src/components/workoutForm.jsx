import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export default function WorkoutForm() {
    const {dispatch} = useWorkoutsContext();
    const [data, setData] = useState({title: '', load: '', reps: ''});
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
        .then(res=> {
            if(res.error) {
                setError(res.error);
            } else {
                setError(null);
                console.log('added!');
                dispatch({type: 'CREATE_WORKOUTS', payload: res});
                setData({title: '', load: '', reps: ''});
            }
            console.log(res);
        }).catch((er)=>console.log(er));
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>
            <label>Exersize Title:</label>
            <input type="text" onChange={(e)=> setData({...data, 'title': e.target.value})} value = {data.title} />
            <label>Load (Kg):</label>
            <input type="number" onChange={(e)=> setData({...data, 'load': e.target.value})} value = {data.load} />
            <label>Reps:</label>
            <input type="number" onChange={(e)=> setData({...data, 'reps': e.target.value})} value = {data.reps} />
            <button>Add</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}