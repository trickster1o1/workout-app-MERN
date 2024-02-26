import { WorkoutsContext } from "../context/workoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);
    if(!context) {
        throw Error('the context must be used inside the provider');
    }

    return context;
}