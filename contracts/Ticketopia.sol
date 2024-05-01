// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//INTERNAL IMPORT FOR NFT OPENZIPLINE
import "@openzeppelin/contracts/utils/Counters.sol"; // using as a counter whit keep track of id and counter
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // Using ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract Ticketopia is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _ticketsIds;
    Counters.Counter private _ticketsSold;

    // uint256 listingPrice = 0.0015 ether;

    address payable owner;
    string private eventName;
    uint256 private Price;
    string private venue;
    uint256 private quantity;
    mapping(uint256 => TicketItem) private idTicketItem;


    struct Event {
        string eventName;
        string venue;
        string date;
        string time;
        uint256 Price;
        uint256 quantity;
        address sender;         
    }

    Event[] private  events;
    mapping (uint => Event) private Eventagg;
    event eventCreated(
        string EventName,
        string venue,
        string date,
        string Time,
        uint256 Price,
        uint256 quantity,
        address sender);


    // Add an event to the registry
    function addEvent(string memory _eventName,string memory _venue,string memory _date, string memory _time, uint256 _Price,
        uint256 _quantity) public {
        events.push(Event(_eventName,_venue, _date, _time,_Price, _quantity, msg.sender));
        emit eventCreated(_eventName,_venue,_date, _time,_Price, _quantity, msg.sender);
    }

    // Get the total number of events
    function getTotalEvents() public view returns (uint) {
        return events.length;
    }

    // Get event by index
    function getEvent(uint index) public view returns (string memory, string memory, string memory,string memory,uint256,uint256,address) {
        require(index < events.length, "Index out of bounds");
        return (
            events[index].eventName,
            events[index].venue,
            events[index].date, 
            events[index].time, 
            events[index].Price,
            events[index].quantity,
            msg.sender);
    }

    struct TicketItem {
        uint256 TicketId;
        address payable seller;
        address payable owner;
        string  EventName;
        string  location;
        uint256 Price;
        bool sold;
    }

    event idTicketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        string  EventName,
        string  venue,
        uint256 Price,
        bool sold
    );

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "only owner of the marketplace can change the listing price"
        );
        _;
    }

    constructor() ERC721("NFT Tickets", "NFTtkt") {
        owner == payable(msg.sender);
    }


    // ASK JEFF: what exactly does this do??? and what is _Eventindex. How are you seperating events for each address who created events?
  function createTicket(uint _Eventindex)
        public
        payable
        returns (uint256)
    {
        _ticketsIds.increment();

        uint256 newTicketId = _ticketsIds.current();

        _mint(msg.sender, newTicketId);
        // _setTokenURI(newTicketId, index);

        createTicketItem(_Eventindex, newTicketId, Price, eventName, venue);

        return newTicketId;
    }

    //CREATING MARKET ITEMS

    // ASK JEFF: if we're getting the price created in addEvent function, then why is it here as a parameter?
    function createTicketItem(uint _index,uint256 ticketId, uint256 _Price, string memory event_name, string memory _venue) private {
    _Price = events[_index].Price;
    require(_Price > 0, "Price must be at least 1");
    require(_index < events.length, "Index out of bounds");

    idTicketItem[ticketId] = TicketItem(
        ticketId,
        payable(msg.sender),
        payable(address(this)),
        event_name,
        _venue,
        Price,
        false
    );

    _transfer(msg.sender, address(this), ticketId);

    emit idTicketItemCreated(
        ticketId,
        msg.sender,
        address(this),
        eventName,
        venue,
        Price,
        false);
    }

    //get balance
    function getBalance(address sent) public view  returns (uint){
        return sent.balance;
    }


    //FUNCTION CREATEMARKETSALE

    function createTicketSale(uint256 ticketId) public payable {
        uint256 price = idTicketItem[ticketId].Price;

        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        idTicketItem[ticketId].owner = payable(msg.sender);
        idTicketItem[ticketId].sold = true;
        idTicketItem[ticketId].owner = payable(address(0));

        _ticketsSold.increment();

        _transfer(address(this), msg.sender, ticketId);

        // payable(owner).transfer(listingPrice); 
        payable(idTicketItem[ticketId].seller).transfer(msg.value);
    }

    //Function Get ticket
    function getTicket(uint _index,uint amount) public payable {
        amount =  events[_index].Price;
        address to = events[_index].sender;
        (bool sent,) = to.call{value: msg.value}("");
        require(msg.sender == to,"You cant send to yourself");
        // require(msg.value== amount,"insufficient amount");
        require(sent,"failed to send");
        if (sent){
            createTicket(_index);
        }else{
            revert("Cannot");
        }
    }

    function getAmount(uint _index) public view returns (uint){
        // TODO: Error check
        require(_index < events.length,"Index out of bounds");
        uint amount = events[_index].Price;
        return amount;
    }
    
}