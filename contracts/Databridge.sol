pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract Databridge {
    address public owner;
    Dataset[] public datasets;
    uint256 public currentBalance;
    uint256 public numberValidDatasets;

    struct Dataset {
        address owner;
        uint256 id;
        string name;
        string description;
        bool valid;
        string location;
    }

    function() public payable {}

    function Databridge() public payable {
        owner = msg.sender;
        currentBalance = msg.value;
        numberValidDatasets = 0;
    }

    function kill() public {
        if (msg.sender == owner)
            selfdestruct(owner);
    }

    function uniqueId(uint256 _id) public constant returns(bool) {
        for (uint256 i = 0; i < datasets.length; i++) {
            if (datasets[i].id == _id)
                return false;
        }
        return true;
    }

    function uniqueName(string _name) public constant returns(bool) {
        for (uint256 i = 0; i < datasets.length; i++) {
            if (keccak256(datasets[i].name) == keccak256(_name))
                return false;
        }
        return true;
    }

    function getDatasetOwner(uint256 _id, string _name) public constant returns(uint256) {
        for (uint256 i = 0; i < datasets.length; i++) {
            if (datasets[i].id == _id && keccak256(datasets[i].name) == keccak256(_name)) {
                return i;
            }
        }
        return 0;
    }

    function checkDatasetExists(uint256 _id, string _name) public constant returns(bool) {
        for (uint256 i = 0; i < datasets.length; i++) {
            if (datasets[i].id == _id && keccak256(datasets[i].name) == keccak256(_name)) {
                return true;
            }
        }
        return false;
    }

    function getAllDatasets() public constant returns(Dataset[]) {
        return datasets;
    }

    function uploadDataset(uint256 _id, string _name, string _description) public payable {
        require(uniqueId(_id));
        require(uniqueName(_name));

        Dataset memory uploadSet;

        uploadSet.owner = msg.sender;
        uploadSet.id = _id;
        uploadSet.name = _name;
        uploadSet.description = _description;
        uploadSet.valid = false;
        uploadSet.location = "";

        currentBalance += msg.value;
        datasets.push(uploadSet);
    }

    function validateDataset(uint256 _id, string _name) public payable {
        require(checkDatasetExists(_id, _name));
        uint256 datasetIndex = getDatasetOwner(_id, _name);

        if (msg.sender == owner && !datasets[datasetIndex].valid) {
            currentBalance += msg.value;
            numberValidDatasets += 1;
            uint256 etherAmount = currentBalance/(numberValidDatasets + 1);
            datasets[datasetIndex].owner.transfer(etherAmount);
            datasets[datasetIndex].valid = true;
        }
    }

    function donate() public payable {
        currentBalance += msg.value;
    }
}
