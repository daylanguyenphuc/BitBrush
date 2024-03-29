// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Artwork {
    struct NFT {
        string id;
        address owner;
        uint256 price; // Add price property
    }

    struct Transaction {
        string nftId;
        address previousOwner;
        address newOwner;
        uint256 price;
    }

    mapping(string => NFT) private nfts;
    mapping(address => Transaction[]) private walletTransactions;
    mapping(string => Transaction[]) private nftTransactions;

    event NFTMinted(string id, address owner);
    event NFTBought(string id, address previousOwner, address newOwner);

    function mintNFT(string memory id, uint256 price) public {
        require(nfts[id].owner == address(0), "NFT with this ID already exists");
        
        NFT memory newNFT = NFT(id, msg.sender, price); // Include price when minting
        nfts[id] = newNFT;
        
        emit NFTMinted(id, msg.sender);
    }

    function buyNFT(string memory id) public payable {
        require(nfts[id].owner != address(0), "NFT with this ID does not exist");
        require(nfts[id].owner != msg.sender, "You already own this NFT");
        require(msg.value >= nfts[id].price, "Sent value must be equal to or exceed the NFT price"); // Check price

        address previousOwner = nfts[id].owner;
        address newOwner = msg.sender;

        nfts[id].owner = newOwner;

        // Transfer the ownership of the NFT
        payable(previousOwner).transfer(msg.value);

        // Record the transaction
        Transaction memory transaction = Transaction(id, previousOwner, newOwner, msg.value);
        walletTransactions[previousOwner].push(transaction);
        walletTransactions[newOwner].push(transaction);
        nftTransactions[id].push(transaction);

        emit NFTBought(id, previousOwner, newOwner);
    }

    function resellNFT(string memory id, uint256 newPrice) public {
        require(nfts[id].owner == msg.sender, "You must own the NFT to resell it");
        require(newPrice > 0, "Price must be greater than zero");

        nfts[id].price = newPrice;
    }

    function getWalletTransactions(address wallet) public view returns (Transaction[] memory) {
        return walletTransactions[wallet];
    }

    function getNFTTransactions(string memory id) public view returns (Transaction[] memory) {
        return nftTransactions[id];
    }
}
