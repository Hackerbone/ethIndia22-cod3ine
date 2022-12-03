import { Form, Input } from "antd";
import React, { useState } from "react";
import ModalComponent from "../common/ModalComponent";
import SquadButton from "../common/SquadButton";
import { createGroup } from "../../services/services";

const CreateGroupModal = ({ show, setShow,getGroups }: any) => {
  const [loading,setLoading] = useState(false)

  return (
    <ModalComponent show={show} setShow={setShow} title="Create a Group">
      <Form
        style={{ marginTop: "5rem", marginBottom: "2rem" }}
        onFinish={async (value) => {
          setLoading(true)
          console.log(value.groupName);
          const res = await createGroup(value.groupName);
          console.log("groupName added", res);
          await getGroups()
          setLoading(false)
          setShow(false)
        }}
      >
        <Form.Item label="group name" name="groupName">
          <Input
            placeholder="Group Name"
            className="search-bar-common"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <SquadButton type="primary" htmlType="submit" loading={loading}>
          Add
        </SquadButton>
      </Form>
    </ModalComponent>
  );
};

export default CreateGroupModal;
