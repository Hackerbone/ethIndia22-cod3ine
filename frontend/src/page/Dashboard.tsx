import React from "react";
import Layout from "../components/Layout";
import AddEmployee from "./DashboardPages/AddEmployee";

function Dashboard() {
  return (
    <div>
      <Layout>
        <AddEmployee />
      </Layout>
    </div>
  );
}

export default Dashboard;
