// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OTToken is ERC20, Ownable {

    event Minted(address indexed to, uint256 amount);
    event Burned(address indexed from, uint256 amount);

    constructor() ERC20("OT Coin", "OTC") {
        uint256 initialSupply = 1000000 * 10 ** decimals();
        _mint(msg.sender, initialSupply);
        emit Minted(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be > 0");
        _mint(to, amount);
        emit Minted(to, amount);
    }

    function burn(uint256 amount) public {
        require(amount > 0, "Amount must be > 0");
        _burn(msg.sender, amount);
        emit Burned(msg.sender, amount);
    }

    function burnFrom(address account, uint256 amount) public {
        uint256 currentAllowance = allowance(account, _msgSender());
        require(currentAllowance >= amount, "Insufficient allowance");
        _approve(account, _msgSender(), currentAllowance - amount);
        _burn(account, amount);
        emit Burned(account, amount);
    }
}
