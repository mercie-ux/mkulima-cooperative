import React, { Children } from 'react';
import { Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthForm from './components/AuthForm'; 
import { useAuth } from './context/AuthContext';
import FarmerDashboard from './pages/FarmerDashboard';
import Layout from './components/Layout';
import MyCrops from './pages/MyCrops';
import Profile from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminRoute } from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import Farmers from './pages/Farmers';
import Crops from './pages/Crops';


function App() {
  const { user } = useAuth();
  return (
    <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm/>}/>
          <Route path="/auth" element={<AuthForm />}/>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<FarmerDashboard />} />
            <Route path="/mycrops" element={<MyCrops />}/>
            <Route path="/profile" element={<Profile />}/>
          </Route>
          <Route path="/admin" element={<AdminRoute><AdminLayout></AdminLayout></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="farmers" element={<Farmers />} />
            <Route path="crops" element={<Crops />}/> 
          </Route>
          {/*Fallback (if no route matches) */}
          <Route path="*" element={<AuthForm />} />
        </Routes>
    </div>
  );
}

export default App;
