import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import Search from './pages/search/search';
import SignIn from './pages/authrization/SignIn';
import SignUp from './pages/authrization/SignUp';
import Profile from './pages/profile/Profile'; // Add profile route
import SideNav from './components/sideNav/SideNav'; // Import SideNav

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Central authentication state

  useEffect(() => {
    // Check if token exists in localStorage to set authentication state
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); // Run only once when the app mounts

  return (
    <div className="App">
      <Router>
        <Header />
        {/* Pass authentication state to SideNav */}
        <SideNav isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass setter to SignIn */}
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Home />} /> {/* Protect Profile */}
          <Route path="/search" element={<Search />} />
          <Route path="/*" element={<h1>Error Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;