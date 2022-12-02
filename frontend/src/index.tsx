import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Web3AuthProvider } from "./contexts/SocialLoginContext";
import { SmartAccountProvider } from "./contexts/SmartAccountContext";
import { Web3ContextProvider } from "ethers-react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Connect from "./page/Connect";
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
