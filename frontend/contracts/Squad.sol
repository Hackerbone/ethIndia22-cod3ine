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

    struct Group {
        string name;
        address[] members;
        address[] files;
    }

    Group[] public groups;
    mapping(string => Group) public groupMap;
    mapping(address => string) public fileNames;

    constructor (string memory _orgName) {
        admin = payable(msg.sender);
        orgName = _orgName;
    }

    // function to add employees to the organization
    function addEmployee(address _employeeAddress, string memory _employeeName) public {
        require(msg.sender == admin, "Only admin can add employees");
        require(bytes(_employeeName).length > 0, "Employee name cannot be empty");
        employeeAddrs.push(_employeeAddress);
        employeeNames[_employeeAddress] = _employeeName;
    }

    // function to create a group
    function createGroup(string memory _groupName) public {
        require(msg.sender == admin, "Only admin can create groups");
        require(bytes(_groupName).length > 0, "Group name cannot be empty");
        // check if group already exists
        require(groupMap[_groupName].members.length == 0, "Group already exists");
        Group memory newGroup = Group(_groupName, new address[](0), new address[](0));
        groups.push(newGroup);
        groupMap[_groupName] = newGroup;
    }

    // add an employee to a group by groupName
    function addEmployeeToGroup(string memory _groupName, address _employeeAddress) public {
        require(msg.sender == admin, "Only admin can add employees to groups");
        bool employeeExists = false;
        for (uint i = 0; i < employeeAddrs.length; i++) {
            if (employeeAddrs[i] == _employeeAddress) {
                employeeExists = true;
                break;
            }
        }
        require(employeeExists, "Employee does not exist");
        groupMap[_groupName].members.push(_employeeAddress);
    }

    // delete employee from a group
    function deleteEmployeeFromGroup(string memory _groupName, address _employeeAddress) public {
        require(msg.sender == admin, "Only admin can delete employees from groups");
        Group storage group = groupMap[_groupName];
        for (uint i = 0; i < group.members.length; i++) {
            if (group.members[i] == _employeeAddress) {
                group.members[i] = group.members[group.members.length - 1];
                group.members.pop();
                break;
            }
        }
    }

    // add file to group, only allowed by admin or other members in group
    function addFileToGroup(string memory _groupName, address _fileAddress, string memory _fileName) public {
        Group storage group = groupMap[_groupName];
        bool memberExists = false;
        for (uint i = 0; i < group.members.length; i++) {
            if (group.members[i] == msg.sender) {
                memberExists = true;
                break;
            }
        }
        require(memberExists || msg.sender == admin, "Only admin or members of group can add files to group");
        group.files.push(_fileAddress);
        fileNames[_fileAddress] = _fileName;
    }

    // delete file from group, only allowed by admin or other members in group
    function deleteFileFromGroup(string memory _groupName, address _fileAddress) public {
        Group storage group = groupMap[_groupName];
        bool memberExists = false;
        for (uint i = 0; i < group.members.length; i++) {
            if (group.members[i] == msg.sender) {
                memberExists = true;
                break;
            }
        }
        require(memberExists || msg.sender == admin, "Only admin or members of group can delete files from group");
        for (uint i = 0; i < group.files.length; i++) {
            if (group.files[i] == _fileAddress) {
                group.files[i] = group.files[group.files.length - 1];
                group.files.pop();
                break;
            }
        }
    }

    // get all files with their filenames in a group
    function getFilesInGroup(string memory _groupName) public view returns (address[] memory, string[] memory) {
        Group storage group = groupMap[_groupName];
        string[] memory fileNamesInGroup = new string[](group.files.length);
        for (uint i = 0; i < group.files.length; i++) {
            fileNamesInGroup[i] = fileNames[group.files[i]];
        }
        return (group.files, fileNamesInGroup);
    }

    // get all groups
    function getGroups() public view returns (Group[] memory) {
        return groups;
    }

   
    // get all employees with their names as employee array
    function getEmployees() public view returns (Employee[] memory) {
        Employee[] memory employees = new Employee[](employeeAddrs.length);
        for (uint i = 0; i < employeeAddrs.length; i++) {
            employees[i] = Employee(employeeNames[employeeAddrs[i]], employeeAddrs[i]);
        }
        return employees;
    }
    

        // get all employees in a group with their name as one object
    function getEmployeesInGroup(string memory _groupName) public view returns (Employee[] memory) {
        Group storage group = groupMap[_groupName];
        Employee[] memory employees = new Employee[](group.members.length);
        for (uint i = 0; i < group.members.length; i++) {
            employees[i] = Employee(employeeNames[group.members[i]], group.members[i]);
        }
        return employees;
    }
}