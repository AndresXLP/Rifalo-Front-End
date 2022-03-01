import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar2 } from './Components/Navbar';
import { HomeRifa } from './Views/HomeRifa';
import { LandingPage } from './Views/LandingPage';
import { CrearRifa } from './Views/CrearRifa';
import { RegistForm } from './Components/RegistForm';
import { SessionLogin } from './Views/SessionLogin';

function App() {
  return (
    <Router>
      <Navbar2 />
      <Routes>
        <Route path="*" element={<LandingPage />} />
        <Route path="/sessionlogin" element={<SessionLogin />} />
        <Route path="/registro" element={<RegistForm />} />
        <Route path="/rifa" element={<HomeRifa />} />
        <Route path="/crear-rifa" element={<CrearRifa />} />
      </Routes>
    </Router>
  );
}

export default App;
