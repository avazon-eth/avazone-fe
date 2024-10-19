import PropTypes from "prop-types";
import { useGoogleLoginHook } from "@/common/hooks";

const GoogleLoginModal = ({ isOpen, onClose }) => {
  const login = useGoogleLoginHook();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Log in or Sign up</h2>
          <button onClick={onClose} className="text-white">
            &times;
          </button>
        </div>
        <button
          onClick={login}
          className="flex items-center justify-center w-full bg-white text-black py-2 rounded-full mb-4"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
        <button className="w-full bg-gray-700 text-white py-2 rounded-full">
          Continue as a guest
        </button>
      </div>
    </div>
  );
};

GoogleLoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GoogleLoginModal;
