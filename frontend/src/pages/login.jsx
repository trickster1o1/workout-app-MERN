import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function LogIn() {
    const [data,setData] = useState({email: '', password: ''});
    const {login, loading, error} = useLogin(); 

    const logIn = async (e) => {
        e.preventDefault();
        await login(data);
    }
    return (
        <form className="login" onSubmit={logIn}>
            <h3>Log In</h3>
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
            <button disabled={loading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}