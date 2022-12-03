import { Divider, Menu } from 'antd'
import React from 'react'
import { BiBuildingHouse } from "react-icons/bi"
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation()


    const organisationMenuItems = [
        {
            key: '1',
            icon: <BiBuildingHouse className="sidebar-nav-icon" />,
            label: 'Organisations',
            path: "/organisations"
        }
    ]

    const groupsMenuItems = [
        {
            key: '1',
            icon: <BiBuildingHouse className="sidebar-nav-icon" />,
            label: 'Groups',
            path: "/groups"
        },
        {
            key: '2',
            icon: <BiBuildingHouse className="sidebar-nav-icon" />,
            label: 'Users',
            path: "/organisations/users"
        },

    ]

    return (
        <div className="sidebar-sidebarContainer">
            <div className="sidebar-logoContainer">
                <div className="sidebar-logo">SQ</div>
            </div>

            <Divider className="sidebar-divider" />

            <div className="sidebar-menuContainer">
                {location.pathname === "/organisations" ? (
                    <>
                        {organisationMenuItems.map((item, index) => (
                            <NavLink to={item.path} key={index} className={(props) => props.isActive ? 'active-nav-item' : ''}>
                                <div className="sidebar-nav-item" >
                                    {item.icon}
                                    <div className="nav-text">{item.label}</div>
                                </div>
                            </NavLink>
                        ))}
                    </>
                ) : null}


                {location.pathname === "/organisations/users" || location.pathname.includes("/groups") ? (
                    <>
                        {groupsMenuItems.map((item, index) => (
                            <NavLink to={item.path} key={index} className={(props) => props.isActive ? 'active-nav-item' : ''}>
                                <div className="sidebar-nav-item" >
                                    {item.icon}
                                    <div className="nav-text">{item.label}</div>
                                </div>
                            </NavLink>
                        ))}
                    </>
                ) : null}

            </div>
        </div>
    )
}

export default Sidebar