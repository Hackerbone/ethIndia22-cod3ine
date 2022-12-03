import { Table } from 'antd'
import React from 'react'

const TableComponent = ({ dataSource, columns, loading }: any) => {
    return (
        <div className="tablecomponent-main-container">

            <Table
                loading={loading}
                dataSource={dataSource}
                columns={columns}
                pagination={false} />
        </div>
    )
}

export default TableComponent