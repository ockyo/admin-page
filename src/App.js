import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './componets/Login';
import { Register } from './componets/Register';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

import ProtectedRoute from "./componets/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <div className="App">

      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
        
          </Routes>
        </Router>
      </AuthProvider>


    </div>
  );
}

export default App;
