import React from "react";
import Layout from "../components/Layout";
import AddEmployee from "./DashboardPages/AddEmployee";
import UploadFile from "./DashboardPages/UploadFile";

function Dashboard() {
  return (
    <div>
      <Layout route={"Dashboard"}>
        <AddEmployee />
      </Layout>
    </div>
  );
}

export default Dashboard;
