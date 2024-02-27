import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export default function WorkoutForm() {
    const {dispatch} = useWorkoutsContext();
    const [data, setData] = useState({title: '', load: '', reps: ''});
    const [error, setError] = useState({title: null, load:null, reps: null});
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
                setError(res.errors.errors);
                console.log(res.errors.errors.load);
            } else {
                setError({title: null, load: null, reps: null});
                console.log('added!');
                dispatch({type: 'CREATE_WORKOUTS', payload: res});
                setData({title: '', load: '', reps: ''});
            }
        }).catch((er)=>console.log(er));
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>
            <label>Exersize Title:</label>
            <input type="text" onChange={(e)=> setData({...data, 'title': e.target.value})} value = {data.title}
                className={error.title ? 'error' : ''}
            />
            {error.title ? <span className="error">{error.title.kind.toUpperCase()}</span> : null}
            <label>Load (Kg):</label>
            <input type="number" onChange={(e)=> setData({...data, 'load': e.target.value})} value = {data.load}
                className={error.load ? 'error' : ''}
            />
            {error.load ? <span className="error">{error.load.kind.toUpperCase()}</span> : null}
            <label>Reps:</label>
            <input type="number" onChange={(e)=> setData({...data, 'reps': e.target.value})} value = {data.reps}
                className={error.reps ? 'error' : ''}
            />
            {error.reps ? <span className="error">{error.reps.kind.toUpperCase()}</span> : null}
            <button>Add</button>
        </form>
    )
}