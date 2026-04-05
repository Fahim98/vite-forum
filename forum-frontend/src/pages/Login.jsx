import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
              // save the token and user info to the browser's local storage
              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email }));
              
              console.log('Saved to local storage!');
              
              // 4. Redirect the user to the Home page
              navigate('/'); 
            } else {
              alert(`Login Failed: ${data.message}`);
              console.error('Login error details:', data);
            }
            
          } catch (error) {
            console.error('Network error during login:', error);
            alert('Could not connect to the server. Please try again later.');
          }
        };

  return (
    <div className="login-container">
      <h2>Sign In to the Forum</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}