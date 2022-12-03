import React from "react";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import Layout from "../components/Layout";
import AddEmployee from "./DashboardPages/AddEmployee";
import UploadFile from "./DashboardPages/UploadFile";

function Dashboard() {
  return (
    <div>
      <Layout route={"Dashboard"}>
        <UploadFile />
      </Layout>
    </div>
  );
}

export default Dashboard;
