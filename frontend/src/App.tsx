import React from "react";
import { useNavigate } from "react-router-dom";
const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landingPage">
      <h1>SQUAD</h1>
      <button className="btn btn-black" onClick={() => navigate("/connect")}>
        Start now
      </button>
    </div>
  );
};

export default App;
