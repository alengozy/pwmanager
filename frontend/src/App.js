import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Home } from "./components/home";
import { Navigation } from './components/navigation';
import { Logout } from './components/logout';

function App() {
    return (
        <BrowserRouter>
            <Navigation></Navigation>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
