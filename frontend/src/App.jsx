import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import Navigation from './components/nav';
import LogIn from './pages/login';
import SignUp from './pages/signUp';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
