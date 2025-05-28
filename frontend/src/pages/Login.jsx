import { useState } from "react";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/auth/login', { email, password });

    const { token, role } = res.data;

    localStorage.setItem('token', token);        // Save JWT token
    localStorage.setItem('role', role);          // Save role: 'admin' or 'user'

    alert('Login successful!');

    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  } catch (err) {
    console.error(err);
    alert('Login failed. Please check your credentials.');
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-70 p-4">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md sm:max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? 
              <a href="/signup" className="text-blue-500 hover:underline"> Register here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
