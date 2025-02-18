// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ILendingProtocol {
    function deposit(address asset, uint256 amount) external;
    function withdraw(address asset, uint256 amount) external;
    function getInterestRate(address asset) external view returns (uint256);
}

contract LendingOptimizer {
    address public owner;

    event FundsDeposited(address indexed protocol, address indexed asset, uint256 amount);
    event FundsWithdrawn(address indexed protocol, address indexed asset, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function depositFunds(address protocol, address asset, uint256 amount) external onlyOwner {
        ILendingProtocol(protocol).deposit(asset, amount);
        emit FundsDeposited(protocol, asset, amount);
    }

    function withdrawFunds(address protocol, address asset, uint256 amount) external onlyOwner {
        ILendingProtocol(protocol).withdraw(asset, amount);
        emit FundsWithdrawn(protocol, asset, amount);
    }

    function getBestInterestRate(address asset, address[] memory protocols) external view returns (address bestProtocol, uint256 bestRate) {
        bestRate = 0;
        for (uint i = 0; i < protocols.length; i++) {
            uint256 rate = ILendingProtocol(protocols[i]).getInterestRate(asset);
            if (rate > bestRate) {
                bestRate = rate;
                bestProtocol = protocols[i];
            }
        }
    }
}
