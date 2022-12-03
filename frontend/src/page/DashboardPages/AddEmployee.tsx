import React from "react";

import { Button, Form, Input, Upload } from "antd";
import { handleFileUpload } from "../../services/fileUpload";
// import { useNavigate } from "react-router-dom";

function AddEmployee() {
  return (
    <form onSubmit={handleFileUpload}>
      <input name="file" type="file" />
      <button type="submit">Upload File</button>
    </form>
  );
}

export default AddEmployee;
