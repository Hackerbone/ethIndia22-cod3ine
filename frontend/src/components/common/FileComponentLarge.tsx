import { Button } from 'antd'
import React from 'react'
import { AiOutlineFileText } from "react-icons/ai"

const FileComponentLarge = () => {
    return (
        <Button className="fileComponent-large-contaier">
            <div className="fileComponent-filetype-large">
                <AiOutlineFileText className="filecl-filetype" />
            </div>
            <div style={{display:"flex",flexDirection: "column",alignItems:"flex-start"}}>

            <h3 className="filecl-name">VAPT Report</h3>
            <p className="filecl-size">200KB</p>
            </div>
        </Button>
    )
}

export default FileComponentLarge