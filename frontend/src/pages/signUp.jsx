import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function SignUp() {
    const [data,setData] = useState({email: '', password: ''});
    const {signup, loading, error} = useSignup(); 
    const signUp = async (e) => {
        e.preventDefault();
        await signup(data);
    }
    return (
        <form className="signup" onSubmit={signUp}>
            <h3>Sign Up</h3>
            <label>Email</label>
            <input type="email" 
                onChange={(e)=>setData({...data, email: e.target.value})}
                value={data.email}
            />
            <label>Password</label>
            <input type="password" 
                onChange={(e)=>setData({...data, password: e.target.value})}
                value={data.password}
            />
            <button disabled={loading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}