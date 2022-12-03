import React from "react";

import { Button, Form, Upload, UploadProps } from "antd";
import { handleFileUpload } from "../../services/fileUpload";

const { Dragger } = Upload;
// import { useNavigate } from "react-router-dom";

const props: UploadProps = {
  name: "file",
  multiple: false,
  customRequest: () => {
    setTimeout(() => {
      console.log("setTimeout");
    }, 0);
  },
  beforeUpload: (file) => {
    console.log("beforeUpload", file);
    return false;
  },
};

function UploadFile() {
  return (
    <Form
      onFinish={async (value) => {
        const fileObject = value.fileUpload.file;

        await handleFileUpload(fileObject);
      }}
      layout="vertical"
    >
      <Form.Item name="fileUpload" label="Upload your File here">
        <Dragger {...props}>
          <h1
            style={{
              fontSize: "1.5rem",
              marginBottom: "0",
            }}
          >
            Store your files securely on the blockchain
          </h1>
          <p
            style={{
              marginBottom: "2rem",
            }}
          >
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

export default UploadFile;
