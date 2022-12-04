import { Select } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { getAllGroups } from "../../services/services";
import "./Dashboard.css";

const Dashboard = () => {
  const params = useParams();
  const { groupname } = params;
  const [groups, setGroups] = useState<any>([]);

  const getAndSetGroups = async () => {
    const res = await getAllGroups();
    console.log("Organisation details", res);

    let tableData: any = [];
    res.forEach((val: string, ind: number) => {
      console.log(val);
      tableData.push({
        groupName: val,
        files: 4,
        users: 3,
      });
    });
    setGroups(tableData);
  };

  useEffect(() => {
    getAndSetGroups();
  }, []);

  return (
    <DashboardLayout
      headerExtra={
        <Select
          defaultValue={groupname}
          className="search-bar-common-select change-project-dashboard"
        >
          {groups &&
            groups.map((val: any) => (
              <Select.Option>{val.groupName}</Select.Option>
            ))}
        </Select>
      }
    >
      <Outlet />
    </DashboardLayout>
  );
};

export default Dashboard;
