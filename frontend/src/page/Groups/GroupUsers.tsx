import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React, { useState } from 'react'
import { FaEthereum } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import SearchBar from '../../components/common/SearchBar';
import SquadButton from '../../components/common/SquadButton';
import TableComponent from '../../components/common/TableComponent';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import InviteUsersModal from '../../components/Modals/InviteUsersModal';

const GroupUsers = () => {
    const [data, setData] = useState([
        {
            displayName: "Seturamen",
            address: "1231239182798127",
            role: "Owner",

        }
    ])


    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    danger: true,
                    label: 'Delete User',
                },
            ]}
        />
    );

    const columns = [
        {
            title: 'Display Name',
            dataIndex: 'displayName',
            key: 'displayName',
            render: (displayName: any) =>
                <div className="orgtable-orgName">{displayName}</div>

        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (add: any) =>
                <div style={{ cursor: "pointer" }}><FaEthereum style={{ marginRight: 6 }} />{add}</div>
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
    
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (actions: any) => (
                <div style={{ display: 'flex', justifyContent: "flex-end", alignItems: 'center', paddingRight: "2rem" }}>
                    <Dropdown overlay={menu}>
                        <FiMoreVertical style={{ fontSize: "1.4rem" }} />
                    </Dropdown>
                </div>
            )
        },
    ];

    const [showModal, setShowModal] = useState(false)
  return (
    <DashboardLayout title={"Group Access Manager"}>
    <SearchBar extra={
        <SquadButton onClick={() => setShowModal(true)} icon={<PlusOutlined />} style={{ width: "fit-content", padding: "0rem 1.5rem" }}>Invite Users</SquadButton>
    } />
    <TableComponent columns={columns} dataSource={data} />
    <InviteUsersModal show={showModal} setShow={setShowModal} />
</DashboardLayout>
  )
}

export default GroupUsers