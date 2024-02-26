import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import Navigation from './components/nav';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
