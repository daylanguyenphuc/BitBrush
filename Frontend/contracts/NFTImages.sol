// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract NFTImages {
    mapping(uint256 => address) private nftOwners;
    mapping(uint256 => uint256) private nftPrices;
    
    event NFTBought(address buyer, uint256 tokenId, uint256 price);
    
    function buyNFTImageById(uint256 tokenId) public payable {
        require(nftOwners[tokenId] != address(0), "NFT does not exist");
        require(msg.value >= nftPrices[tokenId], "Insufficient funds");
        
        address previousOwner = nftOwners[tokenId];
        address buyer = msg.sender;
        uint256 price = nftPrices[tokenId];
        
        nftOwners[tokenId] = buyer;
        nftPrices[tokenId] = 0;
        
        payable(previousOwner).transfer(price);
        
        emit NFTBought(buyer, tokenId, price);
    }

        function mintNFTImage(uint256 tokenId, uint256 price) public {
        require(nftOwners[tokenId] == address(0), "NFT already exists");
        
        nftOwners[tokenId] = msg.sender;
        nftPrices[tokenId] = price;
    }

    function getMintedNFTs() public view returns (uint256[] memory) {
        uint256 totalSupply = 100; // Replace 100 with the actual total supply value
        uint256[] memory tokenIds = new uint256[](totalSupply);
        uint256 count = 0;
        
        for (uint256 i = 0; i < totalSupply; i++) {
            if (nftOwners[i] != address(0)) {
                tokenIds[count] = i;
                count++;
            }
        }
        
        uint256[] memory mintedNFTs = new uint256[](count);
        
        for (uint256 i = 0; i < count; i++) {
            mintedNFTs[i] = tokenIds[i];
        }
        
        return mintedNFTs;
    }
    
    function getNFTOwner(uint256 tokenId) public view returns (address) {
        return nftOwners[tokenId];
    }

    function getNFTPrice(uint256 tokenId) public view returns (uint256) {
        return nftPrices[tokenId];
    }

    function getWalletInfo() public view returns (address, uint256) {
        return (msg.sender, msg.sender.balance);
    }
}