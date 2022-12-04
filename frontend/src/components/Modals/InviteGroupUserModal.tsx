import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import ModalComponent from "../common/ModalComponent";
import SquadButton from "../common/SquadButton";
import { addEmployeeToGroup } from "../../services/services";
import { ethers } from "ethers";

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(window.ethereum);

const InviteGroupUsersModal = ({ show, setShow, groupName }: any) => {
  const [load, setLoad] = useState(false);
  return (
    <ModalComponent show={show} setShow={setShow} title="Invite User to Group">
      <Form
        style={{ marginTop: "5rem", marginBottom: "2rem" }}
        onFinish={async (value) => {
          console.log(value);
          setLoad(true);

          const EnsRegex =
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
          let employeeAddress = value.employeeAddress;

          if (EnsRegex.test(value.employeeAddress)) {
            const resolver = await provider.getResolver(value.employeeAddress);
            employeeAddress = resolver?.address;
          }

          const res = await addEmployeeToGroup(
            value.groupName,
            employeeAddress
          );
          console.log("address added", res);
          setLoad(false);
          setShow(false);
        }}
        layout="vertical"
      >
        <Form.Item label="Employee Address" name="employeeAddress">
          <Input
            prefix={<FaEthereum />}
            placeholder="User Wallet Address or User ENS Name"
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
        {/* <Form.Item name="organisation">
          <Select
            placeholder="Select Organisation"
            className="search-bar-common-select"
            style={{ width: "100%" }}
          >
            <Select.Option>Bugbase Security</Select.Option>
          </Select>
        </Form.Item> */}
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

export default InviteGroupUsersModal;
