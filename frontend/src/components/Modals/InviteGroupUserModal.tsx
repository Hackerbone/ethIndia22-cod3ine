import { Form, Input, Select } from "antd";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import ModalComponent from "../common/ModalComponent";
import SquadButton from "../common/SquadButton";
import { addEmployeeToGroup } from "../../services/services";

const InviteGroupUsersModal = ({ show, setShow, groupName }: any) => {
  return (
    <ModalComponent show={show} setShow={setShow} title="Invite User to Group">
      <Form
        style={{ marginTop: "5rem", marginBottom: "2rem" }}
        onFinish={async (value) => {
          console.log(value);
          const res = await addEmployeeToGroup(
            value.groupName,
            value.employeeAddress
          );
          console.log("address added", res);
        }}
        layout="vertical"
      >
        <Form.Item label="Employee Address" name="employeeAddress">
          <Input
            prefix={<FaEthereum />}
            placeholder="User Wallet Address"
            className="search-bar-common"
            style={{ width: "100%" }}
          />
        </Form.Item>{" "}
        <Form.Item label="Group" name="groupName" initialValue={groupName}>
          <Input
            disabled
            className="search-bar-common"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item name="organisation">
          <Select
            placeholder="Select Organisation"
            className="search-bar-common-select"
            style={{ width: "100%" }}
          >
            <Select.Option>Bugbase Security</Select.Option>
          </Select>
        </Form.Item>
        <SquadButton
          type="primary"
          htmlType="submit"
          style={{ marginTop: "2rem" }}
        >
          Invite
        </SquadButton>
      </Form>
    </ModalComponent>
  );
};

export default InviteGroupUsersModal;
