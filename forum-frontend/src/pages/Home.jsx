import { Link } from 'react-router-dom';
export default function Home() {
  const isAuthenticated = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="home-container">
      {isAuthenticated ? (
        <>
          <h1>Welcome back, {user?.username}!</h1>
          <p>You are securely logged into the VIP section.</p>
          
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#2a2a2a', borderRadius: '8px' }}>
            <h3>Forum Feed Under Construction</h3>
            <p>This is where we will map through the database and display the posts.</p>
          </div>
        </>
      ) : (
        <>
          <h1>Welcome to DevForum</h1>
          <p>A place to discuss code, share projects, and collaborate.</p>
          
          <div className="home-actions">
            <Link to="/login" className="btn primary-btn">Log In</Link>
            <Link to="/register" className="btn secondary-btn">Sign Up</Link>
          </div>
        </>
      )}
    </div>
  );
}