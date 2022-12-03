// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

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
        IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
            .sendNotification(
                0x3d6e6678E43ecd302867EE0c92bcBF2Fd6C60239, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
                _employeeAddress, // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
                bytes(
                    string(
                        // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                        abi.encodePacked(
                            "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                            "+", // segregator
                            "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                            "+", // segregator
                            "Title", // this is notificaiton title
                            "+", // segregator
                            "Body" // notification body
                        )
                    )
                )
            );
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

    // function to create a group
    function createGroup(string memory _groupName) public {
        require(msg.sender == admin, "Only admin can create groups");
        require(bytes(_groupName).length > 0, "Group name cannot be empty");

        require(
            groupMap[_groupName].members.length == 0,
            "Group already exists"
        );
        Group memory newGroup = Group(
            _groupName,
            new address[](0),
            new address[](0)
        );
        groups.push(newGroup);
        groupMap[_groupName] = newGroup;
    }

    // add an employee to a group by groupName
    function addEmployeeToGroup(
        string memory _groupName,
        address _employeeAddress
    ) public {
        require(msg.sender == admin, "Only admin can add employees to groups");
        bool employeeExists = false;
        for (uint256 i = 0; i < employeeAddrs.length; i++) {
            if (employeeAddrs[i] == _employeeAddress) {
                employeeExists = true;
                break;
            }
        }
        require(employeeExists, "Employee does not exist");
        require(
            bytes(groupMap[_groupName].name).length > 0,
            "Group does not exist"
        );
        // check if employee is already in the group
        Group storage group = groupMap[_groupName];
        for (uint256 i = 0; i < group.members.length; i++) {
            if (group.members[i] == _employeeAddress) {
                revert("Employee already exists in the group");
            }
        }
        groupMap[_groupName].members.push(_employeeAddress);
    }

    // delete employee from a group
    function deleteEmployeeFromGroup(
        string memory _groupName,
        address _employeeAddress
    ) public {
        require(
            msg.sender == admin,
            "Only admin can delete employees from groups"
        );
        require(
            bytes(groupMap[_groupName].name).length > 0,
            "Group does not exist"
        );
        require(
            bytes(employeeNames[_employeeAddress]).length > 0,
            "Employee does not exist"
        );
        Group storage group = groupMap[_groupName];
        for (uint256 i = 0; i < group.members.length; i++) {
            if (group.members[i] == _employeeAddress) {
                group.members[i] = group.members[group.members.length - 1];
                group.members.pop();
                break;
            }
        }
    }

    // add file to group, only allowed by admin or other members in group
    function addFileToGroup(
        string memory _groupName,
        address _fileAddress,
        string memory _fileName
    ) public {
        Group storage group = groupMap[_groupName];
        bool memberExists = false;
        for (uint256 i = 0; i < group.members.length; i++) {
            if (group.members[i] == msg.sender) {
                memberExists = true;
                break;
            }
        }
        // check for null address
        require(_fileAddress != address(0), "File address is required");
        require(bytes(_fileName).length > 0, "File name cannot be empty");
        require(
            bytes(groupMap[_groupName].name).length > 0,
            "Group does not exist"
        );
        require(
            memberExists || msg.sender == admin,
            "Only admin or members of group can add files to group"
        );
        group.files.push(_fileAddress);
        fileNames[_fileAddress] = _fileName;
    }

    // delete file from group, only allowed by admin or other members in group
    function deleteFileFromGroup(string memory _groupName, address _fileAddress)
        public
    {
        require(_fileAddress != address(0), "File address is required");
        require(
            bytes(groupMap[_groupName].name).length > 0,
            "Group does not exist"
        );

        Group storage group = groupMap[_groupName];
        bool memberExists = false;
        for (uint256 i = 0; i < group.members.length; i++) {
            if (group.members[i] == msg.sender) {
                memberExists = true;
                break;
            }
        }
        require(
            memberExists || msg.sender == admin,
            "Only admin or members of group can delete files from group"
        );

        for (uint256 i = 0; i < group.files.length; i++) {
            if (group.files[i] == _fileAddress) {
                group.files[i] = group.files[group.files.length - 1];
                group.files.pop();
                break;
            }
        }
    }

    // get all files with their filenames in a group
    function getFilesInGroup(string memory _groupName)
        public
        view
        returns (address[] memory, string[] memory)
    {
        require(
            bytes(groupMap[_groupName].name).length > 0,
            "Group does not exist"
        );
        Group storage group = groupMap[_groupName];
        string[] memory fileNamesInGroup = new string[](group.files.length);
        for (uint256 i = 0; i < group.files.length; i++) {
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
        for (uint256 i = 0; i < employeeAddrs.length; i++) {
            employees[i] = Employee(
                employeeNames[employeeAddrs[i]],
                employeeAddrs[i]
            );
        }
        return employees;
    }

    // get all employees in a group with their name as one object
    function getEmployeesInGroup(string memory _groupName)
        public
        view
        returns (Employee[] memory)
    {
        // check if group exists
        require(
            bytes(groupMap[_groupName].name).length > 0,
            "Group does not exist"
        );
        Group storage group = groupMap[_groupName];
        Employee[] memory employees = new Employee[](group.members.length);
        for (uint256 i = 0; i < group.members.length; i++) {
            employees[i] = Employee(
                employeeNames[group.members[i]],
                group.members[i]
            );
        }
        return employees;
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
