import { SearchOutlined } from '@ant-design/icons'
import { Input, Row } from 'antd'
import React from 'react'

const SearchBar = ({ extra, placeholder }: any) => {
    return (
        <Row>
            <Input placeholder={placeholder ? placeholder : "Search"}
                style={{ marginRight: extra ? "1.5rem" : 0 }}
                className="search-bar-common"
                prefix={<SearchOutlined />} />
            {extra ? extra : null}
        </Row>
    )
}

export default SearchBar