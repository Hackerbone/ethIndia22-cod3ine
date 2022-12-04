import { Button, Dropdown, Menu, Select } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import TableComponent from "../../components/common/TableComponent";
import { handleDownloadData } from "../../services/fileUpload";
import { getFilesByGroup } from "../../services/services";

const AllFiles = () => {
  const params = useParams();
  const { groupname } = params;

  const [data, setData] = useState<any>([]);

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
            <div className="filecs-name">{file}</div>
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
      title: "Download",
      dataIndex: "download",
      key: "download",
      render: (text: any, record: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: "2rem",
          }}
        >
          <Button
            onClick={async () => {
              console.log(record, "Download");
              const downloadedFile = await handleDownloadData(
                record.encfilehash,
                record.enckeyshash,
                record.file
              );
              if (downloadedFile) {
                console.log("downloadedFile", downloadedFile);
                const url = window.URL.createObjectURL(downloadedFile);
                const link = document.createElement("a");
                link.setAttribute("download", downloadedFile.name);
                link.setAttribute("href", url);
                document.body.appendChild(link);
                console.log("link", link);
                link.click();
              }
            }}
          >
            Download
          </Button>
        </div>
      ),
    },
  ];

  const getFiles = async () => {
    const res = await getFilesByGroup(groupname || "");
    console.log(res);
    const fdata = res.map((file: any) => {
      return {
        file: file.name,
        date: Date.now(),
        by: "Aditya",
        encfilehash: file.encfilehash,
        enckeyshash: file.enckeyshash,
      };
    });
    setData(fdata);
  };

  useEffect(() => {
    getFiles();
  }, []);
  return (
    <>
      <h1 className="dashboardLayout-title" style={{ marginTop: "3rem" }}>
        {groupname} Files
      </h1>
      <SearchBar />
      <TableComponent dataSource={data} columns={columns} />
    </>
  );
};

export default AllFiles;
