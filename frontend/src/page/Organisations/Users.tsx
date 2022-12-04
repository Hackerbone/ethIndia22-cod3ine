import { PlusOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { FaEthereum } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import SearchBar from "../../components/common/SearchBar";
import SquadButton from "../../components/common/SquadButton";
import TableComponent from "../../components/common/TableComponent";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import InviteUsersModal from "../../components/Modals/InviteUsersModal";
import SpinLoader from "../../components/SpinLoader";
import { getAllEmployees } from "../../services/services";

const Users = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          danger: true,
          label: "Delete User",
        },
      ]}
    />
  );

  const columns = [
    {
      title: "Display Name",
      dataIndex: "displayName",
      key: "displayName",
      render: (displayName: any) => (
        <div className="orgtable-orgName">{displayName}</div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (add: any) => (
        <div style={{ cursor: "pointer" }}>
          <FaEthereum style={{ marginRight: 6 }} />
          {add}
        </div>
      ),
    },
    {
      title: "Groups",
      dataIndex: "groups",
      key: "groups",
      render: (groups: any) => <div>{groups} Groups</div>,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (actions: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: "2rem",
          }}
        >
          <Dropdown overlay={menu}>
            <FiMoreVertical style={{ fontSize: "1.4rem" }} />
          </Dropdown>
        </div>
      ),
    },
  ];

  const getEmpOrg = async () => {
    const res = await getAllEmployees();
    console.log("Organisation details", res);
    let tableData: any = [];
    res.forEach((val: any[], ind: number) => {
      console.log(val);
      tableData.push({
        key: ind + 1,
        displayName: val[0],
        address: val[1],
        groups: 3,
      });
      setData(tableData);
    });
  };

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(async () => {
      await getEmpOrg();
      setLoading(false);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  const [showModal, setShowModal] = useState(false);
  return (
    <DashboardLayout title={"Organisation Members"}>
      <SearchBar
        extra={
          <SquadButton
            onClick={() => setShowModal(true)}
            icon={<PlusOutlined />}
            style={{ width: "fit-content", padding: "0rem 1.5rem" }}
          >
            Invite Users
          </SquadButton>
        }
      />
      <SpinLoader isLoading={loading}>
        <TableComponent columns={columns} dataSource={data} />
      </SpinLoader>{" "}
      <InviteUsersModal show={showModal} setShow={setShowModal} />
    </DashboardLayout>
  );
};

export default Users;
