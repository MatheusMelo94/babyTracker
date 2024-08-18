import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuPrincipal from './Components/MenuPrincipal';
import Registro from './Components/Registro';
import Footer from './Components/Footer';
import Home from './Components/Home';
import DashBoard from './Components/DashBoard';
import Logout from './Components/Logout';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <MenuPrincipal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;

