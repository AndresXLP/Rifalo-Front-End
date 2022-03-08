import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar2 } from './Components/Navbar';
import { HomeRifa } from './Views/HomeRifa';
import { LandingPage } from './Views/LandingPage';
import { CrearRifa } from './Views/CrearRifa';
import { RegistForm } from './Components/RegistForm';
import { SessionLogin } from './Views/SessionLogin';
import { Dashboard } from './Views/Dashboard';
import { useSelector } from 'react-redux';
import { selectUser } from './Store/userSlicer/user.slice';

function App() {
  const user = useSelector(selectUser);
  return (
    <Router>
      <Navbar2 isAuth={user} />
      <Routes>
        <Route
          path="/sessionlogin"
          element={<SessionLogin isAuth={user} />}
          exact
        />
        <Route path="/registro" element={<RegistForm />} exact />
        <Route path="/rifa/:id" element={<HomeRifa />} exact />
        {user && (
          <>
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/crear-rifa" element={<CrearRifa />} exact />
          </>
        )}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
