import { useState, useEffect } from "react";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/common/TableComponent";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { getOrganizationDetails } from "../../services/services";

const Organisations = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      key: "1",
      orgName: "Bugbase Organisations",
      address: "No Address Found",
      employees: 3,
      role: "Owner",
    },
  ]);

  const columns = [
    {
      title: "Organisation Name",
      dataIndex: "orgName",
      key: "orgName",
      render: (orgName: any) => (
        <div className="orgtable-orgName" onClick={() => navigate("/groups")}>
          {orgName}
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (add: any) => (
        <div style={{ cursor: "pointer" }}>
          <FaEthereum style={{ marginRight: 6 }} />
          {add}
        </div>
      ),
    },
    {
      title: "Groups",
      dataIndex: "groups",
      key: "groups",
      render: (groups: any) => <div>{groups} Groups</div>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];
  const getOrganisationDetails = async () => {
    const res = await getOrganizationDetails();
    console.log("Organisation details", res);
    setData([
      {
        key: "1",
        orgName: res[0],
        address: res[1],
        employees: res[2].length,
        role: "Owner",
      },
    ]);

    localStorage.setItem("orgName", res[0]);
    localStorage.setItem("contractAddress", res[1]);
  };
  // use effect call getOrganisationDetails
  useEffect(() => {
    getOrganisationDetails();
  }, []);

  return (
    <DashboardLayout title={"Organisations"}>
      <TableComponent columns={columns} dataSource={data} />
    </DashboardLayout>
  );
};

export default Organisations;
