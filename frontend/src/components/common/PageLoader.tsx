import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const PageLoader = () => {

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 42, color: "#fb8500" }} spin />} />
        </div>
    )
}

export default PageLoader