import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useEffect, useState } from 'react';
import { getStorageData } from './utils/storage';
import { AppData } from './types';

// Pages (to be created)
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import AddCustomer from './pages/AddCustomer';
import Deliveries from './pages/Deliveries';
import DeliveryAction from './pages/DeliveryAction';
import Requests from './pages/Requests';
import CanTracking from './pages/CanTracking';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import RouteMap from './pages/RouteMap';

export default function App() {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    setData(getStorageData());
  }, []);

  if (!data) return null;

  const isAuthenticated = data.user?.isAuthenticated;

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/welcome" element={!isAuthenticated ? <Welcome /> : <Navigate to="/" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
          
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/welcome" />} />
          <Route path="/route-map" element={isAuthenticated ? <RouteMap /> : <Navigate to="/login" />} />
          <Route path="/customers" element={isAuthenticated ? <Customers /> : <Navigate to="/login" />} />
          <Route path="/customers/add" element={isAuthenticated ? <AddCustomer /> : <Navigate to="/login" />} />
          <Route path="/deliveries" element={isAuthenticated ? <Deliveries /> : <Navigate to="/login" />} />
          <Route path="/deliveries/:id" element={isAuthenticated ? <DeliveryAction /> : <Navigate to="/login" />} />
          <Route path="/requests" element={isAuthenticated ? <Requests /> : <Navigate to="/login" />} />
          <Route path="/can-tracking" element={isAuthenticated ? <CanTracking /> : <Navigate to="/login" />} />
          <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
