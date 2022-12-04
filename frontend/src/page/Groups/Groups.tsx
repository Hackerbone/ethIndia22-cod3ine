import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/common/SearchBar";
import SquadButton from "../../components/common/SquadButton";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { FiMoreVertical } from "react-icons/fi";
import TableComponent from "../../components/common/TableComponent";
import CreateGroupModal from "../../components/Modals/CreateGroupModal";
import { Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllGroups } from "../../services/services";
import AddUserGroupModal from "../../components/Modals/AddUserGroupModal";
import SpinLoader from "../../components/SpinLoader";

const Groups = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          danger: true,
          label: "Delete Group",
        },
      ]}
    />
  );

  const columns = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      render: (groupName: any) => (
        <div
          className="orgtable-orgName"
          onClick={() => navigate(`/dashboard/${groupName}`)}
        >
          {groupName}
        </div>
      ),
    },
    {
      title: "Files Uploaded",
      dataIndex: "files",
      key: "files",
      render: (files: any) => (
        <div style={{ cursor: "pointer" }}>{files} Files</div>
      ),
    },
    {
      title: "Users",
      dataIndex: "users",
      key: "users",
      render: (users: any, record: any) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`/groups/${record.groupName}/users
          `)
          }
        >
          {users} Users
        </div>
      ),
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

  const getGroups = async () => {
    const res = await getAllGroups();
    // change according to details from creater gro
    let tableData = [...data];
    res.forEach((val: string, ind: number) => {
      console.log(val);
      tableData.push({
        groupName: val,
        files: 4,
        users: 3,
      });
      setData(tableData);
    });
  };

  useEffect(() => {
    setLoading(true);

    const interval = setInterval(async () => {
      await getGroups();
      setLoading(false);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showAdduserModal, setShowAddUserModal] = useState(false);

  return (
    <DashboardLayout title={"Manage Groups"}>
      <SearchBar
        extra={
          <SquadButton
            onClick={() => setShowModal(true)}
            icon={<PlusOutlined />}
            style={{ width: "fit-content", padding: "0rem 1.5rem" }}
          >
            Create Group
          </SquadButton>
        }
      />
      <SpinLoader isLoading={loading}>
        <TableComponent columns={columns} dataSource={data} />
      </SpinLoader>{" "}
      <CreateGroupModal show={showModal} setShow={setShowModal} />
      <AddUserGroupModal
        show={showAdduserModal}
        setShow={setShowAddUserModal}
      />
    </DashboardLayout>
  );
};

export default Groups;
