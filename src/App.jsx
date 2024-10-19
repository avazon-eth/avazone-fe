import "./App.css";
import router from "@/router/router";
import { RouterProvider } from "react-router-dom";
import { GoogleProvider } from "@/common/context/GoogleContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="906965009475-npgq71ptk9vup9oekmce4lk73amrnh5k.apps.googleusercontent.com">
      <GoogleProvider>
        <RouterProvider router={router} />
      </GoogleProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
