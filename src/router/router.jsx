import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "@/common/components";
import { IntroPage } from "@/pages/IntroPage";
import { HomePage } from "@/pages/HomePage";
import { AvagenPage } from "@/pages/AvagenPage";
import { LicensePage } from "@/pages/LicensePage";
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
    path: "/home",
    element: (
      <BaseLayout>
        <HomePage />
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
  {
    path: "/set-license",
    element: (
      <BaseLayout>
        <LicensePage />
      </BaseLayout>
    ),
  },
]);

export default router;
