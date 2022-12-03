import React from 'react'
import Sidebar from './Sidebar'
import "./DashboardLayout.css";
import { Row } from 'antd';
import { FaEthereum } from "react-icons/fa"



const DashboardLayout = ({ children, headerExtra, title }: any) => {
    
    return (
        <>
            <Sidebar />
            <div className="dashboardLayout-contentContainer">
                <div className="dashboardLayout-content">
                    <div className="dashboardLayout-headerContent" style={{ justifyContent: headerExtra ? "space-between" : "flex-end" }}>
                        {headerExtra ? headerExtra : null}
                        <Row className="dashboardLayout-activeWalletContainer" >
                            <FaEthereum className="eth-icon" />
                            <div className="address">21379182379asda...</div>
                        </Row>
                    </div>
                    {title ? <h1 className="dashboardLayout-title">{title}</h1> : null}
                    {children}
                </div>
            </div>
        </>
    )
}

export default DashboardLayout