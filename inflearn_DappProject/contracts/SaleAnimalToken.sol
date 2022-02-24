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

    // 구매 함수
    function purchaseAnimalToken(uint256 _animalTokenId) public payable{
        uint256 price = animalTokenPrices[_animalTokenId];
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(price > 0, "Animal token not on sale.");
        require(price <= msg.value, "Caller sent lower than price."); //msg.value는 함수를 실행할 때 보내는 돈의 양
        require(animalTokenOwner != msg.sender, "Caller is animal token owner."); // 주인이 아니여야 구매 가능

        payable(animalTokenOwner).transfer(msg.value); // msg.value(돈)을 animalTokenOwener에게 준다.
        // 반대로, NFT카드는 돈을 지불한 사람한테 준다. 인자 3개필요(보내는사람, 받는사람, 뭘보낼것인가)
        mintAnimalTokenAddress.safeTransferFrom(animalTokenOwner, msg.sender, _animalTokenId);

        // animalTokenPrices값 초기화, 판매 목록에서 제거
        animalTokenPrices[_animalTokenId] = 0;

        for(uint256 i = 0; i < onSaleAnimalTokenArray.length; i++) {
            if(animalTokenPrices[onSaleAnimalTokenArray[i]] == 0) { // 초기화 한 값 만나면
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[onSaleAnimalTokenArray.length - 1]; // 맨 마지막값을 그 인덱스에 놓고 pop하여 마지막값 없앰
                onSaleAnimalTokenArray.pop();
            }
        }
    }
    
    // 판매중인 토큰 목록의 길이를 반환해주는 함수
    function getOnSaleAnimalTokenArrayLength() view public returns (uint256) {
        return onSaleAnimalTokenArray.length;
    }
}