import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import ModalComponent from "../common/ModalComponent";
import SquadButton from "../common/SquadButton";
import { addEmployee } from "../../services/services";

const InviteUsersModal = ({ show, setShow }: any) => {
  const [load,setLoad] = useState(false)
  return (
    <ModalComponent
      show={show}
      setShow={setShow}
      title="Invite User to Organisation"
    >
      <Form
        style={{ marginTop: "5rem", marginBottom: "2rem" }}
        onFinish={async (value) => {
          console.log(value);
          setLoad(true)
          const res = await addEmployee(
            value.employeeAddress,
            value.employeeName
          );
          setLoad(false)
          setShow(false);
          console.log("address added", res);
        }}
        layout="vertical"
      >
        <Form.Item label="Employee Name" name="employeeName">
          <Input
            placeholder="User Name"
            className="search-bar-common"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Employee Address" name="employeeAddress">
          <Input
            prefix={<FaEthereum />}
            placeholder="User Wallet Address"
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
          loading={load}
        >
          Invite
        </SquadButton>
      </Form>
    </ModalComponent>
  );
};

export default InviteUsersModal;
