import { Button, Form, Upload, UploadProps } from 'antd';
import React from 'react'
import { handleFileUpload } from '../../services/fileUpload';
import ModalComponent from '../common/ModalComponent';
import SquadButton from '../common/SquadButton';


const { Dragger } = Upload


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
    return (
        <ModalComponent show={show} setShow={setShow} title="Upload File to Dev Team" width={1000}>
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
                    <Dragger {...props} >
                        <div style={{ height: "20rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
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
                <SquadButton type="primary" htmlType="submit" style={{width:"10rem"}}>
                    Submit
                </SquadButton>
            </Form>
        </ModalComponent>
    )
}

export default UploadFileModal