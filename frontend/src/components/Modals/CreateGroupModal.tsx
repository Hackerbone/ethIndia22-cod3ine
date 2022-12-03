import { Form, Input, Button } from "antd";
import React from "react";
import ModalComponent from "../common/ModalComponent";
import SquadButton from "../common/SquadButton";
import { createGroup } from "../../services/services";

const CreateGroupModal = ({ show, setShow }: any) => {
  return (
    <ModalComponent show={show} setShow={setShow} title="Create a Group">
      <Form
        style={{ marginTop: "5rem", marginBottom: "2rem" }}
        onFinish={async (value) => {
          console.log(value.groupName);
          const res = await createGroup(value.groupName);
          console.log("groupName added", res);
        }}
      >
        <Form.Item label="group name" name="groupName">
          <Input
            placeholder="Group Name"
            className="search-bar-common"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <SquadButton type="primary" htmlType="submit">
          Add
        </SquadButton>
      </Form>
    </ModalComponent>
  );
};

export default CreateGroupModal;
