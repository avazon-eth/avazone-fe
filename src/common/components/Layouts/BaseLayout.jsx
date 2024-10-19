import { BaseHeader } from "@/common/components";

// Create a layout component
// eslint-disable-next-line react/prop-types
const BaseLayout = ({ children }) => (
  <>
    <BaseHeader isLoggedIn={true} />
    {children}
  </>
);

export default BaseLayout;
