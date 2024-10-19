import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleOAuthHandler = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      console.log(code);

      if (code) {
        try {
          const response = await fetch(
            `http://localhost:8080/users/oauth2/google?code=${encodeURIComponent(
              code
            )}`,
            {
              method: "POST",
            }
          );

          const data = await response.json();
          console.log("Access Token:", data.accessToken);

          // Redirect or update the UI as needed
          navigate("/home");
        } catch (error) {
          console.error("Error exchanging code for token:", error);
        }
      }

      setLoading(false);
    };

    handleOAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null; // or some other UI if needed
};

export default GoogleOAuthHandler;
