import { useState, useEffect } from "react";
import apiClient from "../services/api-client"; // replace with your actual apiClient import
import { useLocation } from "react-router-dom";

const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    apiClient
      .get("/auth/verify-token")
      .then((response) => {
        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location]);

  return { authenticated, loading };
};

export default useAuthentication;
