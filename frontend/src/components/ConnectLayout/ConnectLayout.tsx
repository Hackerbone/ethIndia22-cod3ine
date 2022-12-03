import { Image } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";

const ConnectLayout = ({ children, image, title, subtitle }: any) => {
  const navigate = useNavigate();

  const { address, loading } = useWeb3AuthContext();

  const isAuthenticated = address && !loading;

  if (isAuthenticated) {
    navigate("/organization");
  }

  return (
    <div className="connectLayout-connectLayoutContainer">
      <div className="connectLayout-left">
        <div className="connectLayout-navContainer">
          <div className="navbar-logo">SQUAD</div>
        </div>
        <Image preview={false} src={image} className="connectLayout-image" />
      </div>
      <div className="connectLayout-right">
        {title ? <h1 className="connectLayout-title">{title}</h1> : null}

        {subtitle ? (
          <h4 className="connectLayout-subtitle">{subtitle}</h4>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default ConnectLayout;
