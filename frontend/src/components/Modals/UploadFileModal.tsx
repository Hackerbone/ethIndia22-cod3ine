import { Button, Form, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { handleFileUpload } from "../../services/fileUpload";
import ModalComponent from "../common/ModalComponent";
import SquadButton from "../common/SquadButton";

const { Dragger } = Upload;

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

const UploadFileModal = ({ show, setShow }: any) => {
  const params = useParams();
  const { groupname } = params;
  const [load,setLoad]  = useState(false)
  return (
    <ModalComponent
      show={show}
      setShow={setShow}
      title="Upload File to your group"
      width={1000}
    >
      <Form
        onFinish={async (value) => {
          setLoad(true)
          const fileObject = value.fileUpload.file;
          const finalGroup = groupname || "default";
          const decryptedFileObject: any = await handleFileUpload(
            fileObject,
            finalGroup
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
          setLoad(false)
          setShow(false)
        }}
        layout="vertical"
      >
        <Form.Item name="fileUpload" label="Upload your File here">
          <Dragger {...props}>
            <div
              style={{
                height: "20rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            </div>
          </Dragger>
        </Form.Item>
        <SquadButton
          type="primary"
          htmlType="submit"
          style={{ width: "10rem" }}
          loading={load}
        >
          Submit
        </SquadButton>
      </Form>
    </ModalComponent>
  );
};

export default UploadFileModal;
