import React from 'react';
import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Menu from './components/Menu/Menu';
import Hero from './components/Hero/Hero';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ConfigurePage from './pages/ConfigurePage/ConfigurePage';
import AddExpensePage from './pages/AddExpensePage/AddExpensePage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Menu />
      <Hero />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/configure" element={<ConfigurePage/>}/>
        <Route path="/add-expense" element={<AddExpensePage/>}/>
        <Route path="*">"404 Not Found!"</Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
