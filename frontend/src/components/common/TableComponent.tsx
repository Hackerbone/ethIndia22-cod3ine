import { Table } from 'antd'
import React from 'react'

const TableComponent = ({ dataSource, columns }: any) => {
    return (
        <div className="tablecomponent-main-container">

        <Table
            dataSource={dataSource} 
            columns={columns}
            pagination={false} />
            </div>
    )
}

export default TableComponent