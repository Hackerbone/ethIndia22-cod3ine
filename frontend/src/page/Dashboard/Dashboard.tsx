import { Select } from "antd";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <DashboardLayout
      headerExtra={
        <Select
          defaultValue="Dev Team"
          className="search-bar-common-select change-project-dashboard"
        >
          <Select.Option>Dev Team</Select.Option>
        </Select>
      }
    >
      <Outlet />
    </DashboardLayout>
  );
};

export default Dashboard;
