export const abi = [{
        "constant": false,
        "inputs": [],
        "name": "donate",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_id",
                "type": "uint256"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "uploadDataset",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_id",
                "type": "uint256"
            },
            {
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "validateDataset",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "constant": true,
        "inputs": [{
                "name": "_id",
                "type": "uint256"
            },
            {
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "checkDatasetExists",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "currentBalance",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "uint256"
        }],
        "name": "datasets",
        "outputs": [{
                "name": "owner",
                "type": "address"
            },
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "description",
                "type": "string"
            },
            {
                "name": "valid",
                "type": "bool"
            },
            {
                "name": "location",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAllDatasets",
        "outputs": [{
            "components": [{
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "description",
                    "type": "string"
                },
                {
                    "name": "valid",
                    "type": "bool"
                },
                {
                    "name": "location",
                    "type": "string"
                }
            ],
            "name": "",
            "type": "tuple[]"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
                "name": "_id",
                "type": "uint256"
            },
            {
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "getDatasetOwner",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "numberValidDatasets",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "_id",
            "type": "uint256"
        }],
        "name": "uniqueId",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "_name",
            "type": "string"
        }],
        "name": "uniqueName",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];