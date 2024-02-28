import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup  = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const {dispatch} = useAuthContext();
    const signup = async (data) => {
        setLoading(true);
        setError(null);

        await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
        .then(res=>{
            if(res.error) {
                setLoading(false);
                setError(res.error);
            } else {
                localStorage.setItem('user',JSON.stringify(res));

                // update auth context
                dispatch({type: 'LOGIN', payload: res});
                setLoading(false);

            }
            console.log(res);
        }).catch(e=>{
            console.log(e);
            setError('Server Error');
        });

    }

    return {error, loading, signup };

}