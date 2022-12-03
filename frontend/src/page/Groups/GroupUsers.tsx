import { PlusOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { FaEthereum } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import SquadButton from "../../components/common/SquadButton";
import TableComponent from "../../components/common/TableComponent";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import InviteGroupUsersModal from "../../components/Modals/InviteGroupUserModal";
import { getEmployeesInGroup } from "../../services/services";

const GroupUsers = () => {
  const params = useParams();
  const groupName = params.groupname;
  const [data, setData] = useState([
    {
      displayName: "Seturamen",
      address: "1231239182798127",
      role: "Owner",
    },
  ]);

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
      title: "Role",
      dataIndex: "role",
      key: "role",
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

  useEffect(() => {
    const getEmpInGroup = async () => {
      console.log(groupName);
      if (!groupName) return;
      const res = await getEmployeesInGroup(groupName);
      console.log("Organisation details", res);
      let valData = [...data];
      res.forEach(async (val: any) => {
        valData.push({
          displayName: val.name,
          address: val.addr,
          role: "Member",
        });
      });
      setData(valData);
    };
    getEmpInGroup();
  }, []);

  const [showModal, setShowModal] = useState(false);
  return (
    <DashboardLayout title={"Group Access Manager"}>
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
      <TableComponent columns={columns} dataSource={data} />
      <InviteGroupUsersModal
        show={showModal}
        setShow={setShowModal}
        groupName={groupName}
      />
    </DashboardLayout>
  );
};

export default GroupUsers;
