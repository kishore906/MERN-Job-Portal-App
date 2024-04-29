import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ admin, children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const role = user?.role;
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      }

      if (admin && role !== "admin") {
        return navigate("/dashboard", { replace: true });
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAuthenticated, role, admin, navigate]);

  return children;
}

export default ProtectedRoute;
