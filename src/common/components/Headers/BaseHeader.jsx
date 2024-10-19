import PropTypes from "prop-types";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const BaseHeader = ({ isLoggedIn = false }) => {
  return (
    <div className="flex flex-row justify-between items-center p-4 bg-black gap-4 absolute w-full">
      {/* Logo and Menu */}
      <div className="flex items-center space-x-4">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        {isLoggedIn && (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    My
                  </NavigationMenuLink>
                </Link>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Talk
                  </NavigationMenuLink>
                </Link>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>

      {/* Search */}
      {isLoggedIn && (
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full p-2 bg-gray-800 text-white"
          />
          <Button className="ml-2">🔍</Button> {/* Use shadcn Button */}
        </div>
      )}

      {/* Two Buttons */}
      {isLoggedIn && (
        <div className="flex items-center space-x-4">
          <Button className="bg-gradient-to-r from-[#4620DD] to-[#801AE5] hover:from-[#3D1CC5] hover:to-[#7017CC] text-white px-4 py-2 rounded-full">
            Create
          </Button>
          <Button className="bg-gray-700 text-white px-4 py-2 rounded-full">
            My Profile
          </Button>
        </div>
      )}
    </div>
  );
};

BaseHeader.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default BaseHeader;
