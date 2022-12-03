import React from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Add",
    "Add",
    <PlusOutlined
      style={{
        background: "#fb8500",
        width: "1.5rem",
        margin: "auto",
        height: "1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
        color: "white",
      }}
    />
  ),
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Submenu", "sub1", <UserOutlined />),
  getItem("Files", "9", <FileOutlined />),
];

const settings: MenuItem[] = [
  getItem("Settings", "settings", <TeamOutlined />),
  getItem("Profile", "profile", <TeamOutlined />),
];

const LayoutComponent: React.FC<{
  children?: React.ReactNode;
  route?: String;
}> = ({ children, route }: { children?: React.ReactNode; route?: String }) => {
  const { address, connect } = useWeb3AuthContext();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsed={true} style={{ background: "#0D0D0D" }}>
        <div
          className="logo"
          style={{ height: "4rem", borderBottom: "1px solid #E5E5E580" }}
        />

        <Menu
          defaultSelectedKeys={["1"]}
          items={items}
          style={{
            background: "#0D0D0D",
            padding: "1rem",
            paddingTop: 0,
            color: "#fff",
            borderBottom: "1px solid #E5E5E580",
          }}
        />
        <Menu
          items={settings}
          style={{ background: "#0D0D0D", color: "#fff" }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, background: "transparent" }}
          className="main-header"
          hasSider
        >
          <div className="main-header-content">
            <div className="main-header-title">{"xyz"} Organization</div>
            <div className="main-header-subtitle">{route}</div>
          </div>
          {address ? (
            <div className="wallet-address">
              Wallet Address: {address.slice(0, 6) + "..." + address.slice(-4)}{" "}
              (Status{" "}
              <>
                <div
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "50%",
                    background: "#10ca00",
                    display: "inline-block",
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                  }}
                />
              </>{" "}
              )
            </div>
          ) : (
            <Button
              onClick={connect}
              type="primary"
              style={{ float: "right", marginRight: "2rem" }}
            >
              {"Connect Wallet"}
            </Button>
          )}
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
