import { Button } from "antd";
import React from "react";
import { AiOutlineFileText } from "react-icons/ai";

const FileComponentLarge = ({
  name,
  date,
  by,
  onClick,
}: {
  name: string;
  date: string;
  by: string;
  onClick: () => void;
}) => {
  return (
    <Button className="fileComponent-large-contaier" onClick={onClick}>
      <div className="fileComponent-filetype-large">
        <AiOutlineFileText className="filecl-filetype" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <h3 className="filecl-name">{name}</h3>
        <p className="filecl-size">200KB</p>
      </div>
    </Button>
  );
};

export default FileComponentLarge;
