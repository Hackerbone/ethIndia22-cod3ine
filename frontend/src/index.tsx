import { createRoot } from "react-dom/client";
import App from "./App";
import { Web3AuthProvider } from "./contexts/SocialLoginContext";
import { SmartAccountProvider } from "./contexts/SmartAccountContext";
import { Web3ContextProvider } from "ethers-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Connect from "./page/Connect/Connect";
import Dashboard from "./page/Dashboard";

import "./index.css";
import ConnectSuccess from "./page/Connect/ConnectSuccess";
import CreateOrganisation from "./page/Connect/CreateOrganisation";
import JoinOrganization from "./page/Connect/JoinOrganization";
import Organisations from "./page/Organisations/Organisations";
import Groups from "./page/Groups/Groups";

const element = document.getElementById("root");
const root = createRoot(element!);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/connect",
    element: <Connect />,
  },
  {
    path: "/onboarding",
    element: <ConnectSuccess />,
  },
  {
    path: "/onboarding/create",
    element: <CreateOrganisation />,
  },
  {
    path: "/onboarding/join",
    element: <JoinOrganization />,
  },
  {
    path: "/organisations",
    element: <Organisations />,
  },
  {
    path: "/groups",
    element: <Groups />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },

]);

const Index = () => {
  return (
    <Web3ContextProvider>
      <Web3AuthProvider>
        <SmartAccountProvider>
          <RouterProvider router={router} />
        </SmartAccountProvider>
      </Web3AuthProvider>
    </Web3ContextProvider>
  );
};

root.render(<Index />);
