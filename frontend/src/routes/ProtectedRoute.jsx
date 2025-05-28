// src/routes/ProtectedRoute.jsx
import { Link } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log('Token:', token);
  console.log('Role:', role);  

  // if (!token) {
  //   return <Link to={"/login"}/>;
  // }

  // if (allowedRoles && !allowedRoles.includes(role)) {
  //   return <Navigate to="/" />;
  // }

  return children;
}

export default ProtectedRoute;
