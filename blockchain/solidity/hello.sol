// SPDX-License-Identifier: MIT
pragma solidity >0.6.0 <=0.8.19;

contract Hello {

	uint256 private count;

	function setCount(uint256 _count) public {
		count = _count;
	}

	function getCount() public view returns (uint256) {
		return count;
	}
}
