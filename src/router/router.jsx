import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "@/common/components";
import { IntroPage } from "@/pages/IntroPage";
import { GoogleOAuthHandler } from "@/pages/GoogleOauthHandler";
import { HomePage } from "@/pages/HomePage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AvagenPage } from "@/pages/AvagenPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BaseLayout>
        <IntroPage />
      </BaseLayout>
    ),
  },
  {
    path: "/oauth/google",
    element: <GoogleOAuthHandler />,
  },
  {
    path: "/home",
    element: (
      <BaseLayout>
        <HomePage />
      </BaseLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <BaseLayout>
        <ProfilePage />
      </BaseLayout>
    ),
  },
  {
    path: "/avagen",
    element: (
      <BaseLayout>
        <AvagenPage />
      </BaseLayout>
    ),
  },
]);

export default router;
