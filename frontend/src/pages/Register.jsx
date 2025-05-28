import { useState } from "react";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role = user
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup', { name, email, password, role });
      alert(res.data.message || 'Registration successful! Please login.');
      navigate('/login'); // Go to login after registration
    } catch (err) {
      console.error(err);
      alert('Registration failed. Try a different email.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-70 p-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md sm:max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {/* Role Selection */}
          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Register
            </button>   
          </div>
          
          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">Already have an account? 
              <a href="/login" className="text-blue-500 hover:underline"> Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
