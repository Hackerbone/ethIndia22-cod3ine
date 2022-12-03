import { useState, useEffect } from "react";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/common/TableComponent";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { getOrganizationDetails } from "../../services/services";

const Organisations = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [loading,setLoading] = useState(false)

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

  // use effect call getOrganisationDetails
  useEffect(() => {
    const getOrganisationDetails = async () => {
      setLoading(true)
      const res = await getOrganizationDetails();
      console.log("Organisation details", res);
      setData([
        {
          key: "1",
          orgName: res[0],
          address: res[1],
          employees: res[2].length || 0,
          role: "Owner",
        },
      ]);
      setLoading(false)
    };
    getOrganisationDetails();
  }, []);

  return (
    <DashboardLayout title={"Organisations"}>
      <TableComponent loading={loading} columns={columns} dataSource={data} />
    </DashboardLayout>
  );
};

export default Organisations;
