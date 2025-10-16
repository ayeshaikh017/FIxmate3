import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import RegisterWorker from './pages/RegisterWorker';
import UserDashboard from './pages/UserDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import NotFound from './pages/NotFound';

// Components
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register/user" element={<RegisterUser />} />
                <Route path="/register/worker" element={<RegisterWorker />} />
                
                <Route path="/user/dashboard" element={
                  <PrivateRoute role="user">
                    <UserDashboard />
                  </PrivateRoute>
                } />
                
                <Route path="/worker/dashboard" element={
                  <PrivateRoute role="worker">
                    <WorkerDashboard />
                  </PrivateRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            <Footer />
            
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  padding: '16px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                },
              }}
            />
          </div>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
