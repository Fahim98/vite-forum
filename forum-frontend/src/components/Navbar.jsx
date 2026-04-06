import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // <-- 1. Get the current URL path

  const isAuthenticated = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // 2. The Escape Clause: If we are on login or register, render absolutely nothing
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav style={styles.nav}>
      <h2>DevForum</h2>
      
      <div>
        {isAuthenticated ? (
          <>
            <span style={styles.welcome}>Welcome, {user?.username}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} style={styles.loginBtn}>Log In</button>
        )}
      </div>
    </nav>
  );
}

// Updated styles to match a dark theme
const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    padding: '1rem 2rem', 
    backgroundColor: '#15151a', 
    borderBottom: '1px solid #333',
    alignItems: 'center' 
  },
  welcome: { marginRight: '15px', color: '#a8b2d1' },
  logoutBtn: { padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' },
  loginBtn: { padding: '8px 16px', cursor: 'pointer', backgroundColor: '#3742fa', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }
};