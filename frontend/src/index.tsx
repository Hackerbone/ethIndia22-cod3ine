import { createRoot } from "react-dom/client";
import App from "./App";
import { Web3AuthProvider } from "./contexts/SocialLoginContext";
import { SmartAccountProvider } from "./contexts/SmartAccountContext";
import "./index.css";

const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  return (
    <Web3AuthProvider>
      <SmartAccountProvider>
        <App />
      </SmartAccountProvider>
    </Web3AuthProvider>
  );
};

root.render(<Index />);
