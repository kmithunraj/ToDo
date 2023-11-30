import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user || user.trim() === '') {
      navigate('/');
    }
  }, [navigate]);

  return null;
};

export default Logout;
