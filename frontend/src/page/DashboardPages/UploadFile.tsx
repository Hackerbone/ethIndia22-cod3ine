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
        const groupName = "hr";
        const decryptedFileObject: any = await handleFileUpload(
          fileObject,
          groupName
        );

        if (decryptedFileObject) {
          console.log("decryptedFileObject", decryptedFileObject);
          const url = window.URL.createObjectURL(decryptedFileObject);
          const link = document.createElement("a");
          link.setAttribute("download", decryptedFileObject.name);
          link.setAttribute("href", url);
          document.body.appendChild(link);
          console.log("link", link);
          link.click();
        }
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