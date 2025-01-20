import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './componets/Login';
import { Register } from './componets/Register';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import User from './pages/User/User'
import Product from './pages/Product/Product';

import ProtectedRoute from "./componets/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext";
import Layout from "../src/componets/Layout"

function App() {
  return (
    <div className="App">

      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>

                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard/>
                  </Layout>

                </ProtectedRoute>
              }
            />
             <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <Layout>
                    <User/>
                  </Layout>

                </ProtectedRoute>
              }
            />
             <Route
              path="/product"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Product/>
                  </Layout>

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
