import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import Navigation from './components/nav';
import LogIn from './pages/login';
import SignUp from './pages/signUp';
import { useAuthContext } from './hooks/useAuthContext';
function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <div className='pages'>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path='/login' element={!user ? <LogIn /> : <Navigate to='/' />} />
            <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
