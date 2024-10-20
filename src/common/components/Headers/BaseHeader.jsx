import PropTypes from "prop-types";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { useDynamicContext, DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";

const BaseHeader = () => {
  const { user } = useDynamicContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/" && user) {
      navigate("/home");
    }

    if (window.location.pathname !== "/" && !user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-row justify-between items-center p-4 bg-black gap-4 absolute w-full border-b-white border-b-1 border-solid">
      {/* Logo and Menu */}
      <div className="flex items-center space-x-4">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {user && (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="bg-[#1b1b1b] text-white flex flex-row gap-4">
                <Link to="/home" legacyBehavior passHref>
                  <NavigationMenuLink className={` bg-[#1b1b1b] text-white`}>
                    Home
                  </NavigationMenuLink>
                </Link>
                <Link to="/my" legacyBehavior passHref>
                  <NavigationMenuLink className={` bg-[#1b1b1b] text-white`}>
                    MY
                  </NavigationMenuLink>
                </Link>
                <Link to="/talk" legacyBehavior passHref>
                  <NavigationMenuLink className={` bg-[#1b1b1b] text-white`}>
                    Talk
                  </NavigationMenuLink>
                </Link>
                <Link to="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={` bg-[#1b1b1b] text-white`}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>

      {/* Two Buttons */}
      {user && (
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/avagen")}
            className="bg-gradient-to-r from-[#4620DD] to-[#801AE5] hover:from-[#3D1CC5] hover:to-[#7017CC] text-white px-4 py-2 rounded-full"
          >
            Create
          </Button>
          <DynamicWidget />
        </div>
      )}
    </div>
  );
};

BaseHeader.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default BaseHeader;
