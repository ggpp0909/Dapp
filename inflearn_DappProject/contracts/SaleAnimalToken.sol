// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintAnimalToken.sol";

contract SaleAnimalToken {
    MintAnimalToken public mintAnimalTokenAddress; // Mintanimaltoken을 deploy하게 되면 deploy한 주소가 하나 나오게되는데 그값을 담는다.

    constructor (address _mintAnimalTokenAddress){
        mintAnimalTokenAddress = MintAnimalToken(_mintAnimalTokenAddress);
    }

    mapping(uint256 => uint256) public animalTokenPrices;

    uint256[] public onSaleAnimalTokenArray; // 프론트엔드에서 어떤것이 판매중인지 알 수 있는 배열

    // 판매 등록하는 함수, 두가지 인자필요(뭘팔지, 얼마에 팔지)
    function setForSaleAnimalToken(uint256 _animalTokenId, uint256 _price) public {
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(animalTokenOwner == msg.sender, "Caller is not animal token owner."); // 뒤에는 require 만족 못할시 나올 메세지
        require(_price > 0, "Price is zero or lower.");
        require(animalTokenPrices[_animalTokenId] == 0, "This animal token is already on sale.");
        // 주인이 판매 계약 스마트컨트랙트에 넘겼는지
        require(mintAnimalTokenAddress.isApprovedForAll(animalTokenOwner, address(this)), "Animal token owner did not approve token.");

        animalTokenPrices[_animalTokenId] = _price;

        onSaleAnimalTokenArray.push(_animalTokenId);
    } 
}