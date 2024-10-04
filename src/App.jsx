import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';

function App(){
    return(
        <Router>
            <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;