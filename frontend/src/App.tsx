import React from "react";
import PageLoader from "./components/common/PageLoader";
import { useWeb3AuthContext } from "./contexts/SocialLoginContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./page/Home/Home";
import Connect from "./page/Connect/Connect";
import ConnectSuccess from "./page/Connect/ConnectSuccess";
import CreateOrganisation from "./page/Connect/CreateOrganisation";
import JoinOrganization from "./page/Connect/JoinOrganization";
import Organisations from "./page/Organisations/Organisations";
import Groups from "./page/Groups/Groups";
import Users from "./page/Organisations/Users";
import GroupUsers from "./page/Groups/GroupUsers";

const App: React.FC = () => {
  const {
    // provider, ethersProvider, address,
    loading,
  } = useWeb3AuthContext();

  const authenticatedRoutes = [
    {
      path: "/",
      element: <Home />,
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
      path: "/organisations/users",
      element: <Users />,
    },
    {
      path: "/groups",
      element: <Groups />,
    },
    {
      path: "/groups/:groupname/users",
      element: <GroupUsers />,
    },
    {
      path: "*",
      element: <Home />,
    },
  ];

  const router = createBrowserRouter(authenticatedRoutes);

  if (loading) {
    return <PageLoader />;
  }

  return <RouterProvider router={router} />;
};

export default App;
