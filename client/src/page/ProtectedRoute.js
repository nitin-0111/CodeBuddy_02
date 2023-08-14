import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to='/landing' />;
  }
  {toast.success('Welcome Back !!!', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    })}
  return children;
};
export default ProtectedRoute;
