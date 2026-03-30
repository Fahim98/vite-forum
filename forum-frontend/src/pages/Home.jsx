// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to DevForum</h1>
      <p>A place to discuss code, share projects, and collaborate.</p>
      
      <div className="home-actions">
        <Link to="/login" className="btn primary-btn">Log In</Link>
        <Link to="/register" className="btn secondary-btn">Sign Up</Link>
      </div>
    </div>
  );
}