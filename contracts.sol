// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@gnosis.pm/safe-contracts/contracts/GnosisSafe.sol";

contract ForexTradingAgent {
    address public owner;
    GnosisSafe public safe;

    constructor(address _safeAddress) {
        owner = msg.sender;
        safe = GnosisSafe(_safeAddress);
    }

    function executeTrade(address tokenA, address tokenB, uint256 amount) public {
        require(msg.sender == owner, "Not authorized");

        // Swap tokenA for tokenB (mocked)
        // Add real DEX swap logic here
        safe.execTransactionFromModule(
            address(this),
            0,
            abi.encodeWithSignature("swap(address,address,uint256)", tokenA, tokenB, amount),
            Enum.Operation.Call
        );
    }
}
