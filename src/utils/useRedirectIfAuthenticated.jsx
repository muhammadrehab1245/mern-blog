import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Utility to redirect if the user is already logged in
const useRedirectIfAuthenticated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if Access Token is available in sessionStorage
    const accessToken = sessionStorage.getItem("accessToken");
    console.log("Access Token:", accessToken);

    if (accessToken) {
      // If the access token exists, redirect to home
      navigate("/home");
    }
  }, [navigate]); // Add navigate as a dependency

};

export default useRedirectIfAuthenticated;
