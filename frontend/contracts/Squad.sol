// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Squad {
    address admin;
    string orgName;

    mapping(address => string) public employeeNames;
    address[] public employeeAddrs;

    struct Employee {
        string name;
        address addr;
    }

    struct File {
        string name;
        string encfilehash;
        string enckeyshash;
    }

    struct Group {
        mapping(uint => File) files; // group files
        string name; // group name
        address[] members; // group members
        uint fileCount; // number of files
    }

    Group[] public groups; // array of all groups
    uint public groupCount; // number of groups

    constructor(string memory _orgName) {
        require(bytes(_orgName).length > 0, "Organization name is required");
        admin = payable(msg.sender);
        orgName = _orgName;
    }

    function getOrgDetails()
        public
        view
        returns (
            string memory,
            address,
            Employee[] memory
        )
    {
        Employee[] memory employees = new Employee[](employeeAddrs.length);
        for (uint256 i = 0; i < employeeAddrs.length; i++) {
            employees[i] = Employee(
                employeeNames[employeeAddrs[i]],
                employeeAddrs[i]
            );
        }
        return (orgName, admin, employees);
    }

    // function to add employees to the organization
    function addEmployee(address _employeeAddress, string memory _employeeName)
        public
    {
        require(msg.sender == admin, "Only admin can add employees");
        require(
            bytes(_employeeName).length > 0,
            "Employee name cannot be empty"
        );
        require(_employeeAddress != address(0), "Employee address is required");
        require(
            bytes(employeeNames[_employeeAddress]).length == 0,
            "Employee already exists"
        );
        employeeAddrs.push(_employeeAddress);
        employeeNames[_employeeAddress] = _employeeName;
    }

    // function to create a group, only admins can make groups
    function createGroup(string memory _groupName) public {
        require(msg.sender == admin, "Only admin can create groups");
        require(bytes(_groupName).length > 0, "Group name cannot be empty");
        for (uint256 i = 0; i < groups.length; i++) {
            if (keccak256(bytes(groups[i].name)) == keccak256(bytes(_groupName)))
                revert("Group already exists");
        }
        // make via memory
        Group storage newGroup = groups.push();
        newGroup.name = _groupName;
        newGroup.fileCount = 0;

        groupCount++;
    }

    // add an employee to a group by groupName
    function addEmployeeToGroup(string memory _groupName, address _employee)
        public
    {
        require(msg.sender == admin, "Only admin can add employees to groups");
        require(
            bytes(employeeNames[_employee]).length > 0,
            "Employee does not exist"
        );
        for (uint256 i = 0; i < groups.length; i++) {
            if (keccak256(bytes(groups[i].name)) == keccak256(bytes(_groupName))) {
                for (uint256 j = 0; j < groups[i].members.length; j++) {
                    if (groups[i].members[j] == _employee)
                        revert("Employee already exists in group");
                }
                groups[i].members.push(_employee);
                return;
            }
        }
        revert("Group does not exist");
    }

    // delete employee from a group by groupName
    function deleteEmployeeFromGroup(string memory _groupName, address _employee)
        public
    {
        require(msg.sender == admin, "Only admin can delete employees");
        require(
            bytes(employeeNames[_employee]).length > 0,
            "Employee does not exist"
        );
        for (uint256 i = 0; i < groups.length; i++) {
            if (keccak256(bytes(groups[i].name)) == keccak256(bytes(_groupName))) {
                for (uint256 j = 0; j < groups[i].members.length; j++) {
                    if (groups[i].members[j] == _employee) {
                        groups[i].members[j] = groups[i].members[
                            groups[i].members.length - 1
                        ];
                        groups[i].members.pop();
                        return;
                    }
                }
                revert("Employee does not exist in group");
            }
        }
        revert("Group does not exist");
    }

    // add file to group, only allowed by admin or other members in group
    function addFileToGroup(
        string memory _groupName,
        string memory _fileName,
        string memory _encfilehash,
        string memory _enckeyshash
    ) public {
        require(
            bytes(employeeNames[msg.sender]).length > 0,
            "Only employees can add files"
        );
        for (uint256 i = 0; i < groups.length; i++) {
            if (keccak256(bytes(groups[i].name)) == keccak256(bytes(_groupName))) {
                for (uint256 j = 0; j < groups[i].members.length; j++) {
                    if (groups[i].members[j] == msg.sender) {
                        groups[i].files[groups[i].fileCount] = File(
                            _fileName,
                            _encfilehash,
                            _enckeyshash
                        );
                        groups[i].fileCount++;
                        return;
                    }
                }
                revert("Only members can add files");
            }
        }
        revert("Group does not exist");
    }

    // get all files by group name in array of File structure
    function getFilesByGroup(string memory _groupName)
        public
        view
        returns (File[] memory)
    {
        for (uint256 i = 0; i < groups.length; i++) {
            if (keccak256(bytes(groups[i].name)) == keccak256(bytes(_groupName))) {
                File[] memory files = new File[](groups[i].fileCount);
                for (uint256 j = 0; j < groups[i].fileCount; j++) {
                    files[j] = groups[i].files[j];
                }
                return files;
            }
        }
        revert("Group does not exist");
    }

    function getGroups() public view returns (Group[] storage) {
        return groups;
    }

    // get all employees with their names as employee array
    function getEmployees() public view returns (Employee[] memory) {
        Employee[] memory employees = new Employee[](employeeAddrs.length);
        for (uint256 i = 0; i < employeeAddrs.length; i++) {
            employees[i] = Employee(
                employeeNames[employeeAddrs[i]],
                employeeAddrs[i]
            );
        }
        return employees;
    }

    // get all employees in a group with their name as one object
    function getEmployeesByGroup(string memory _groupName)
        public
        view
        returns (Employee[] memory)
    {
        for (uint256 i = 0; i < groups.length; i++) {
            if (keccak256(bytes(groups[i].name)) == keccak256(bytes(_groupName))) {
                Employee[] memory employees = new Employee[](
                    groups[i].members.length
                );
                for (uint256 j = 0; j < groups[i].members.length; j++) {
                    employees[j] = Employee(
                        employeeNames[groups[i].members[j]],
                        groups[i].members[j]
                    );
                }
                return employees;
            }
        }
        revert("Group does not exist");
    }

    // function to check if user in employee list
    function isEmployee(address _employeeAddress) public view returns (bool) {
        if (_employeeAddress == admin) return true;
        for (uint256 i = 0; i < employeeAddrs.length; i++) {
            if (employeeAddrs[i] == _employeeAddress) {
                return true;
            }
        }
        return false;
    }
}
