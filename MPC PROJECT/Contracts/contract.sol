// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

struct Signature {
    bytes32 r;
    bytes32 s;
    uint8 v;
}

struct UserOperation {
    address payable sender;
    bytes32 message;
    address to;
    uint amount;
    Signature signature;
}

contract EntryPoint {
    event Received(address caller, uint256 amount, string message);
    event log(address status, uint256 data);
    event Deployed(address addr, uint256 salt);

    receive() external payable {
        emit Received(msg.sender, msg.value, "Fallback was called");
    }

    function createWallet(
        address _entrypoint,
        address _owner,
        uint256 _salt
    ) public returns (address, uint256) {
        address addr;
        bytes memory databytes = type(Wallet).creationCode;

        bytes memory bytecode = abi.encodePacked(
            databytes,
            abi.encode(_entrypoint, _owner)
        );

        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), _salt)

            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        emit Deployed(addr, _salt);

        return (addr, _salt);
    }

    function getBalanceOf(address acc) public view returns (uint256) {
        return address(acc).balance;
    }

    function fundWallet(address payable _addr, uint256 amount) public payable {
        (bool success, ) = _addr.call{value: amount}("");
        require(success, "failed to fund wallet");
    }

    function handleOps(
        UserOperation calldata op
    ) public returns (bool) {
        (address _to, uint256 _amount) = Wallet(op.sender).executeOp(op);
        emit log(_to, _amount);
        return true;
    }
}

contract Wallet {
    address _entrypoint;
    address _owner;

    receive() external payable {}

    constructor(address entrypoint_, address owner_) {
        _entrypoint = entrypoint_;
        _owner = owner_;
    }

    function entrypoint() public view returns (address) {
        return _entrypoint;
    }

    function getOwner() public view returns(address){
        return _owner;
    }

    function executeOp(
        UserOperation calldata op
    ) public payable returns (address, uint256) {
        require(
            msg.sender == entrypoint(),
            "this function only call by entrypoint"
        );
        bool success = verifyUserOp(op.message, op.signature);
        require(success == true, "signature should be verify.");
        require(
            address(this).balance >= (op.amount / 1 ether),
            "wallet doesn't have enough balance"
        );
        (bool sent, ) = payable(op.to).call{value: op.amount}("");
        require(sent, "failed to send");
        return (op.to, op.amount);
    }

    function verifyUserOp(bytes32 message, Signature calldata signature)
        public
        view
        returns (bool)
    {
        address signer = ecrecover(
            message,
            signature.v,
            signature.r,
            signature.s
        );
        require(signer == _owner, "signature is not verified");
        return true;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getBalanceOf(address acc) public view returns (uint256) {
        return address(acc).balance;
    }
}

