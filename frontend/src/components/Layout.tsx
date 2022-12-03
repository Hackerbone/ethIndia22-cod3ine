import React, { Children, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";

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
}> = ({ children }: { children?: React.ReactNode }) => {
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
        <Header style={{ padding: 0, background: "transparent" }} />
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
