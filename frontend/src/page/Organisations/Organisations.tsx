import { useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../components/common/TableComponent';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'



const Organisations = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([
        {
            key: "1",
            orgName: "Bugbase Organisations",
            address: "1231239182798127",
            groups: 3,
            role: "Owner"
        }
    ])

    const columns = [
        {
            title: 'Organisation Name',
            dataIndex: 'orgName',
            key: 'orgName',
            render: (orgName: any) =>
                <div className="orgtable-orgName" onClick={() => navigate("/groups")}>{orgName}</div>
    
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (add: any) =>
                <div style={{ cursor: "pointer" }}><FaEthereum style={{ marginRight: 6 }} />{add}</div>
        },
        {
            title: 'Groups',
            dataIndex: 'groups',
            key: 'groups',
            render: (groups: any) =>
                <div>{groups} Groups</div>
    
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];
    

    return (
        <DashboardLayout title={"Organisations"}>
            <TableComponent columns={columns} dataSource={data} />
        </DashboardLayout>
    )
}

export default Organisations