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
  const [load, setLoad] = useState(false)
  const [form] = Form.useForm()
  return (
    <ModalComponent show={show} setShow={setShow} title="Invite User to Group">
      <Form
        form={form}
        style={{ marginTop: "5rem", marginBottom: "2rem" }}
        onValuesChange={async (changedValues) => {
          if (changedValues.employeeENS) {
            const EnsRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/ig;

            if (EnsRegex.test(changedValues.employeeENS)) {
              const resolver = await provider.getResolver(changedValues.employeeENS);

              if (resolver?.address) {
                form.setFieldValue("employeeAddress", resolver?.address)
              }
            }
          }

          if (changedValues.employeeAddress) {

              const resolver = await provider.lookupAddress(changedValues.employeeAddress);
              if (resolver) {
                form.setFieldValue("employeeENS", resolver)
              }
              console.log(resolver)
          }
        }}
        onFinish={async (value) => {
          console.log(value);
          setLoad(true)

          const res = await addEmployeeToGroup(
            value.groupName,
            value.employeeAddress
          );
          console.log("address added", res);
          setLoad(false);
          setShow(false);
        }}
        layout="vertical"
      >
        <Form.Item label="Employee ENS Name" name="employeeENS">
          <Input
            prefix={<FaEthereum />}
            placeholder="User ENS Name"
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
