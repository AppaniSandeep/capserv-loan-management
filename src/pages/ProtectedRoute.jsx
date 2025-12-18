import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
  const {user} = useAuth();
  return user ? children : <Navigate to="/" />
}



export default ProtectedRoute





// // ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const user = localStorage.getItem("currentUser");

//   if (!user) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
