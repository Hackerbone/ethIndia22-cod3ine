import { Button } from 'antd'
import React from 'react'
import "./Common.css"

const SquadButton = ({
    loading,
    children,
    disabled,
    icon,
    onClick,
    className,
    style,
    htmlType
} : any) => {
    return (
        <Button
            loading={loading}
            disabled={disabled}
            icon={icon}
            className={`common-squadButton ${className}`}
            onClick={onClick}
            style={style}
            htmlType={htmlType}
        >
            {children}
        </Button>
    )
}

export default SquadButton