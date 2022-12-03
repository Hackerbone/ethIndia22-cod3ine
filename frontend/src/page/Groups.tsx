import React from "react";
import Layout from "../components/Layout";
import TableComponent from "../components/Table";

function Groups() {
  return (
    <div>
      <Layout route={"Manage Groups"}>
        <TableComponent />
      </Layout>
    </div>
  );
}

export default Groups;
