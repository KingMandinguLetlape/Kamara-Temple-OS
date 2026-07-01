// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract KamaraPayment {

    struct Tx {
        string qrId;
        address payer;
        address receiver;
        uint256 amount;
        uint256 expiry;
        bool settled;
    }

    mapping(string => Tx) public txs;
    address public owner;

    event Created(string indexed qrId, address indexed payer, address indexed receiver, uint256 amount);
    event Settled(string indexed qrId, address indexed receiver, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function create(
        string memory qrId,
        address receiver,
        uint256 amount,
        uint256 expiry
    ) public payable {
        require(msg.value == amount, "Invalid value");
        require(receiver != address(0), "Invalid receiver");
        require(txs[qrId].payer == address(0), "QR ID already exists");
        require(expiry > block.timestamp, "Invalid expiry");

        txs[qrId] = Tx(qrId, msg.sender, receiver, amount, expiry, false);

        emit Created(qrId, msg.sender, receiver, amount);
    }

    function settle(string memory qrId) public {
        Tx storage t = txs[qrId];

        require(t.payer != address(0), "Transaction not found");
        require(!t.settled, "Already settled");
        require(block.timestamp <= t.expiry, "Transaction expired");

        t.settled = true;
        (bool success, ) = payable(t.receiver).call{value: t.amount}("");
        require(success, "Transfer failed");

        emit Settled(qrId, t.receiver, t.amount);
    }

    function getTx(string memory qrId) public view returns (Tx memory) {
        return txs[qrId];
    }

    function getTxStatus(string memory qrId) public view returns (string memory) {
        if (txs[qrId].payer == address(0)) return "NOT_FOUND";
        if (txs[qrId].settled) return "SETTLED";
        if (block.timestamp > txs[qrId].expiry) return "EXPIRED";
        return "PENDING";
    }

    receive() external payable {}

    fallback() external payable {}
}
