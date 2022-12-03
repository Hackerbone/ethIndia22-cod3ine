import { Button, Dropdown, Menu, Row } from "antd";
import React, { useState } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import FileComponentLarge from "../../components/common/FileComponentLarge";
import SearchBar from "../../components/common/SearchBar";
import TableComponent from "../../components/common/TableComponent";
import UploadFileModal from "../../components/Modals/UploadFileModal";

const DashboardHome = () => {
  const [show, setShow] = useState(false);

  const [data, setData] = useState([
    {
      file: "VAPT Report",
      date: "18th Oct 2022",
      by: "Aditya",
    },
    {
      file: "VAPT Report",
      date: "18th Oct 2022",
      by: "Aditya",
    },
    {
      file: "VAPT Report",
      date: "18th Oct 2022",
      by: "Aditya",
    },
  ]);

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          danger: true,
          label: "Delete File",
        },
      ]}
    />
  );

  const columns = [
    {
      title: "File Name",
      dataIndex: "file",
      key: "file",
      render: (file: any) => (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div className="fileComponent-filetype-small">
            <AiOutlineFileText className="filecs-filetype" />
          </div>
          <div>
            <div className="filecs-name">VAPT Report</div>
            <div className="filecs-size">200KB</div>
          </div>
        </div>
      ),
    },
    {
      title: "Uploaded on",
      dataIndex: "date",
      key: "date",
      render: (date: any) => <div>{date}</div>,
    },
    {
      title: "Uploaded By",
      dataIndex: "by",
      key: "by",
      render: (by: any) => <div style={{ cursor: "pointer" }}>{by}</div>,
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

  return (
    <div className="dashboard-main-container">
      <Row>
        <SearchBar />
        <Button
          className="btn"
          style={{
            marginLeft: "1rem",
          }}
          onClick={() => setShow(true)}
        >
          Upload File
        </Button>
      </Row>
      <h1 className="dashboardLayout-title" style={{ marginTop: "3rem" }}>
        Quick Access
      </h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <FileComponentLarge />
        <FileComponentLarge />
        <FileComponentLarge />
        <FileComponentLarge />
        <FileComponentLarge />
      </div>
      <h1 className="dashboardLayout-title" style={{ marginTop: "3rem" }}>
        Your Files
      </h1>
      <TableComponent dataSource={data} columns={columns} />
      <UploadFileModal show={show} setShow={setShow} />
    </div>
  );
};

export default DashboardHome;
