# 스마트 컨트랙트 작성

## 첫번째 스마트 컨트랙트

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

ERC721 -> NFT

오픈 제플린의 ERC721Enumerable에서는 ERC721에서 좀더 확장된 기능을 제공해준다.

![image-20220224123024666](summary.assets/image-20220224123024666.png)

배포 후에모습,  mintAnimalToken만 만들었지만 다른 기능들은 제플린에서 제공해 준 것.

mintAnimalToken을 눌러서 animaltoken을 민팅한 후 ownerOf 에서 번호를 call하면 그 NFT의 주인(주소)를 보여줌.