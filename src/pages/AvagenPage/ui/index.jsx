import { putToken } from "@/utils/putToken";
import { useEffect, useState, useRef } from "react";
import { polling } from "@/utils/polling";
import { useNavigate } from "react-router-dom";

const AvagenPage = () => {
  const [genURI, setGenURI] = useState("");
  const [sessionId, setSessionId] = useState("");
  const navigate = useNavigate();
  const pollingInProgress = useRef(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = localStorage.getItem(
          "dynamic_min_authentication_token"
        );
        const res = await putToken(accessToken);
        setGenURI(
          `https://staging.d9xje8vs9f8su.amplifyapp.com/#/${res.token_key}`
        );
        setSessionId(res.data_session_id);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    const performPolling = async () => {
      try {
        const res = await polling(sessionId);

        console.log(res);

        if (res.data) {
          navigate(`/set-license?creation_id=${res.data}`);
        }
      } catch (error) {
        console.error("Polling error:", error);
      } finally {
        pollingInProgress.current = false;
      }
    };

    const interval = setInterval(() => {
      // Check if the previous polling call is still running
      if (!pollingInProgress.current) {
        pollingInProgress.current = true;
        performPolling();
      }
    }, 2000); // Increase interval to 2 seconds

    return () => clearInterval(interval); // Cleanup function to stop polling on unmount
  }, [navigate, sessionId]);

  return (
    <iframe
      src={genURI}
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Avagen Page"
      className="pt-24"
    />
  );
};

export default AvagenPage;
