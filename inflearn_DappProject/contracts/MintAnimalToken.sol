// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("h662Animals", "HAS") {} // constructor는 컨트랙트가 빌드될때 한번 실행

        function mintAnimalToken() public {
            uint256 animalTokenId = totalSupply() + 1; // totalSupply는 ERC721Enumerable에서 제공, 지금까지 발행(minting)된 NFT양을 나타냄
            _mint(msg.sender, animalTokenId);
        
    }
}
