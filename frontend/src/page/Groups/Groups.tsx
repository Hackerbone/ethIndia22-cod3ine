import { PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import SearchBar from '../../components/common/SearchBar'
import SquadButton from '../../components/common/SquadButton'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import { FiMoreVertical } from "react-icons/fi"
import TableComponent from '../../components/common/TableComponent'
import CreateGroupModal from '../../components/Modals/CreateGroupModal'
import { Dropdown, Menu } from 'antd'



const Groups = () => {
    const [data, setData] = useState([
        {
            groupName: "Dev Group",
            files: 3,
            users: 3,

        }
    ])


    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    danger: true,
                    label: 'Delete Group',
                },
            ]}
        />
    );

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'groupName',
            key: 'groupName',
            render: (groupName: any) =>
                <div className="orgtable-orgName">{groupName}</div>

        },
        {
            title: 'Files Uploaded',
            dataIndex: 'files',
            key: 'files',
            render: (files: any) =>
                <div style={{ cursor: "pointer" }}>{files} Files</div>
        },
        {
            title: 'Users',
            dataIndex: 'users',
            key: 'users',
            render: (users: any) =>
                <div>{users} Users</div>

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
        <DashboardLayout title={"Manage Groups"}>
            <SearchBar extra={
                <SquadButton onClick={() => setShowModal(true)} icon={<PlusOutlined />} style={{ width: "fit-content", padding: "0rem 1.5rem" }}>Create Group</SquadButton>
            } />
            <TableComponent columns={columns} dataSource={data} />
            <CreateGroupModal show={showModal} setShow={setShowModal} />
        </DashboardLayout>
    )
}

export default Groups