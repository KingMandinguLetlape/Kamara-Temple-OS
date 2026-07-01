// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ORANFTMarketplace is ERC721URIStorage, Ownable {
    
    struct NFTListing {
        uint256 tokenId;
        address creator;
        address currentOwner;
        uint256 price;
        bool forSale;
        uint256 createdAt;
    }
    
    struct Auction {
        uint256 tokenId;
        address highestBidder;
        uint256 highestBid;
        uint256 endTime;
        bool active;
    }
    
    mapping(uint256 => NFTListing) public nftListings;
    mapping(uint256 => Auction) public auctions;
    mapping(address => uint256[]) public userNFTs;
    mapping(address => uint256) public userBalances;
    
    uint256 public totalMinted;
    uint256 public platformFeePercentage = 2;
    
    event NFTMinted(uint256 indexed tokenId, address indexed creator, string uri);
    event ListedForSale(uint256 indexed tokenId, uint256 price);
    event SaleCancelled(uint256 indexed tokenId);
    event NFTSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event AuctionStarted(uint256 indexed tokenId, uint256 endTime);
    event BidPlaced(uint256 indexed tokenId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed tokenId, address indexed winner, uint256 finalBid);
    
    constructor() ERC721("ORA NFT", "ORANFT") {}
    
    // Mint new NFT
    function mint(string memory uri) public {
        uint256 tokenId = totalMinted++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        
        nftListings[tokenId] = NFTListing(
            tokenId,
            msg.sender,
            msg.sender,
            0,
            false,
            block.timestamp
        );
        
        userNFTs[msg.sender].push(tokenId);
        emit NFTMinted(tokenId, msg.sender, uri);
    }
    
    // List NFT for sale
    function listForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        require(price > 0, "Price must be > 0");
        
        NFTListing storage listing = nftListings[tokenId];
        listing.price = price;
        listing.forSale = true;
        
        emit ListedForSale(tokenId, price);
    }
    
    // Cancel listing
    function cancelListing(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        nftListings[tokenId].forSale = false;
        emit SaleCancelled(tokenId);
    }
    
    // Buy NFT
    function buyNFT(uint256 tokenId) public payable {
        NFTListing storage listing = nftListings[tokenId];
        require(listing.forSale, "Not for sale");
        require(msg.value >= listing.price, "Insufficient funds");
        
        address seller = ownerOf(tokenId);
        uint256 platformFee = (listing.price * platformFeePercentage) / 100;
        uint256 sellerAmount = listing.price - platformFee;
        
        // Transfer NFT
        _transfer(seller, msg.sender, tokenId);
        
        // Update listing
        listing.forSale = false;
        listing.currentOwner = msg.sender;
        userNFTs[msg.sender].push(tokenId);
        
        // Transfer funds
        payable(seller).transfer(sellerAmount);
        userBalances[owner()] += platformFee;
        
        emit NFTSold(tokenId, seller, msg.sender, listing.price);
    }
    
    // Start auction
    function startAuction(uint256 tokenId, uint256 initialBid, uint256 durationDays) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        
        Auction storage auction = auctions[tokenId];
        auction.tokenId = tokenId;
        auction.highestBid = initialBid;
        auction.endTime = block.timestamp + (durationDays * 1 days);
        auction.active = true;
        
        emit AuctionStarted(tokenId, auction.endTime);
    }
    
    // Place bid
    function placeBid(uint256 tokenId) public payable {
        Auction storage auction = auctions[tokenId];
        require(auction.active, "Auction not active");
        require(block.timestamp < auction.endTime, "Auction ended");
        require(msg.value > auction.highestBid, "Bid too low");
        
        // Refund previous bidder
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }
        
        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
        
        emit BidPlaced(tokenId, msg.sender, msg.value);
    }
    
    // End auction
    function endAuction(uint256 tokenId) public {
        Auction storage auction = auctions[tokenId];
        require(auction.active, "Auction not active");
        require(block.timestamp >= auction.endTime, "Auction not ended");
        
        auction.active = false;
        
        if (auction.highestBidder != address(0)) {
            address seller = ownerOf(tokenId);
            
            // Transfer NFT
            _transfer(seller, auction.highestBidder, tokenId);
            
            // Calculate fees
            uint256 platformFee = (auction.highestBid * platformFeePercentage) / 100;
            uint256 sellerAmount = auction.highestBid - platformFee;
            
            // Transfer funds
            payable(seller).transfer(sellerAmount);
            userBalances[owner()] += platformFee;
            
            emit AuctionEnded(tokenId, auction.highestBidder, auction.highestBid);
        }
    }
    
    // Get user NFTs
    function getUserNFTs(address user) public view returns (uint256[] memory) {
        return userNFTs[user];
    }
    
    // Withdraw platform fees
    function withdrawFees() public onlyOwner {
        uint256 amount = userBalances[owner()];
        require(amount > 0, "No fees to withdraw");
        userBalances[owner()] = 0;
        payable(owner()).transfer(amount);
    }
}
