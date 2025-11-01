import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddEquip from './pages/AddEquip';
import IndexPage from './pages/First';
import EquipmentsList from './pages/BookEquip';
import { useState } from 'react';
import RefreshHandler from './RefereshHandler'; // ✅ ensure filename matches
import Profile from './pages/EditProfile';
import Consultants from './pages/Consultants';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      {/* ✅ RefreshHandler sets auth state on reload */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/addEquip" element={<PrivateRoute element={<AddEquip />} />} />
        <Route path="/disEquip" element={<PrivateRoute element={<EquipmentsList />} />} />
        <Route path="/editProfile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/consultants" element={<PrivateRoute element={<Consultants />} />} />
      </Routes>
    </div>
  );
}

export default App;
