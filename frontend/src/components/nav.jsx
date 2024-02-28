import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navigation() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const logoutHandler = () => {
    logout();
  };

  return (
    <header>
      <div className="cont">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user ? (
            <div>
                <span>{user.email}</span>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
