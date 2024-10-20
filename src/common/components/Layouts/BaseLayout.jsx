import { BaseHeader } from "@/common/components";

// Create a layout component
// eslint-disable-next-line react/prop-types
const BaseLayout = ({ children }) => {
  return (
    <>
      <BaseHeader />
      {children}
    </>
  );
};

export default BaseLayout;
