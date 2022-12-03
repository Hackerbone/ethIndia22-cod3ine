import { Image } from "antd";

const ConnectLayout = ({ children, image, title, subtitle }: any) => {
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
