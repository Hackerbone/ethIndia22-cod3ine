import { Button, Divider, Tooltip } from "antd";
import { BiBuildingHouse } from "react-icons/bi";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { MdOutlineGroups } from "react-icons/md";
import {
  DeleteOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { ImFilesEmpty, ImHome } from "react-icons/im";
import UploadFileModal from "../Modals/UploadFileModal";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const params = useParams();

  const { groupname } = params;

  const [uploadModal, setUploadModal] = useState(false);

  const organisationMenuItems = [
    {
      key: "1",
      icon: <BiBuildingHouse className="sidebar-nav-icon" />,
      label: "Organisations",
      path: "/organisations",
    },
  ];

  const groupsMenuItems = [
    {
      key: "1",
      icon: <MdOutlineGroups className="sidebar-nav-icon" />,
      label: "Groups",
      path: "/groups",
    },
    {
      key: "2",
      icon: <UsergroupAddOutlined className="sidebar-nav-icon" />,
      label: "Users",
      path: "/organisations/users",
    },
  ];

  const dashboardMenuItems = [
    {
      key: "1",
      icon: <ImHome className="sidebar-nav-icon" />,
      label: "Home",
      path: `/dashboard/${groupname}`,
    },
    {
      key: "2",
      icon: <ImFilesEmpty className="sidebar-nav-icon" />,
      label: "Files",
      path: `/dashboard/${groupname}/files`,
    },
    {
      key: "3",
      icon: <DeleteOutlined className="sidebar-nav-icon" />,
      label: "Trash",
      path: `/dashboard/${groupname}/trash`,
    },
  ];

  return (
    <div className="sidebar-sidebarContainer">
      <div className="sidebar-logoContainer">
        <NavLink className="sidebar-logo" to="/organisations">
          SQ
        </NavLink>
      </div>

      <Divider className="sidebar-divider" />

      <div className="sidebar-menuContainer">
        {location.pathname === "/organisations" ? (
          <>
            {organisationMenuItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={(props) =>
                  props.isActive ? "active-nav-item" : "nav-item"
                }
              >
                <div className="sidebar-nav-item">
                  {item.icon}
                  <div className="nav-text">{item.label}</div>
                </div>
              </NavLink>
            ))}
          </>
        ) : null}

        {location.pathname === "/organisations/users" ||
        location.pathname.includes("/groups") ? (
          <>
            {groupsMenuItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={(props) =>
                  props.isActive ? "active-nav-item" : "nav-item"
                }
              >
                <div className="sidebar-nav-item">
                  {item.icon}
                  <div className="nav-text">{item.label}</div>
                </div>
              </NavLink>
            ))}
          </>
        ) : null}

        {location.pathname.includes("/dashboard") ? (
          <>
            <Tooltip title="Upload Files" placement="right">
              <Button
                className="nav-add-files-button"
                icon={<PlusOutlined className="the-upload-icon" />}
              />
            </Tooltip>
            {dashboardMenuItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={(props) =>
                  props.isActive && location.pathname === item.path
                    ? "active-nav-item"
                    : ""
                }
              >
                <div className="sidebar-nav-item">
                  {item.icon}
                  <div className="nav-text">{item.label}</div>
                </div>
              </NavLink>
            ))}
          </>
        ) : null}
      </div>
      <UploadFileModal show={uploadModal} setShow={setUploadModal} />
    </div>
  );
};

export default Sidebar;
