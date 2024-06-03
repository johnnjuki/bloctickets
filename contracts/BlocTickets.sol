// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.4;

// //INTERNAL IMPORT FOR NFT OPENZIPLINE
// import "@openzeppelin/contracts/utils/Counters.sol"; // using as a counter whit keep track of id and counter
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // Using ERC721 standard
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// import "hardhat/console.sol";

// contract BlocTickets is ERC721URIStorage {
//     using Counters for Counters.Counter;

//     Counters.Counter private _ticketsIds;
//     Counters.Counter private _ticketsSold;

//     // uint256 listingPrice = 0.0015 ether;

//     address payable owner;
//     string private eventName;
//     uint256 private Price;
//     string private venue;
//     uint256 private quantity;
//     mapping(uint256 => TicketItem) private idTicketItem;

//     struct Event {
//         string name;
//         string description;
//         string venue;
//         string date;
//         string time;
//         string price;
//         uint256 quantity;
//         address sender;
//     }

//     Event[] private events;
//     mapping(uint => Event) private Eventagg;
//     event eventCreated(
//         string name,
//         string description,
//         string venue,
//         string date,
//         string time,
//         string price,
//         uint256 quantity,
//         address sender
//     );

//     // Add an event to the registry
//     // TODO: Change to createEvent
//     // TODO: Add description
//     // TODO: Start and end times
//     // TODO: Add event category
//     // TODO: Speakers or Artists..
//     // TODO: Event Schedule
//     function createEvent(
//         string memory _name,
//         string memory _description,
//         string memory _venue,
//         string memory _date,
//         string memory _time,
//         string memory _price,
//         uint256 _quantity
//     ) public {

//         events.push(
//             Event(
//                 _name,
//                 _description,
//                 _venue,
//                 _date,
//                 _time,
//                 _price,
//                 _quantity,
//                 msg.sender
//             )
//         );
//         emit eventCreated(
//             _name,
//             _description,
//             _venue,
//             _date,
//             _time,
//             _price,
//             _quantity,
//             msg.sender
//         );
//     }

//     // Get all events
//     function getAllEvents() public view returns (Event[] memory) {
//         return events;
//     }

//     // Get event by index
//     // function getEvent(uint index) public view returns (string memory, string memory, string memory,string memory,uint256,uint256,address) {
//     //     require(index < events.length, "Index out of bounds");
//     //     return (
//     //         events[index].eventName,
//     //         events[index].venue,
//     //         events[index].date,
//     //         events[index].time,
//     //         events[index].Price,
//     //         events[index].quantity,
//     //         msg.sender);
//     // }

//     function getEvent(uint index) public view returns (Event memory) {
//         require(index < events.length, "Index out of bounds");
//         return events[index];
//     }

//     struct TicketItem {
//         uint256 TicketId;
//         address payable seller;
//         address payable owner;
//         string EventName;
//         string location;
//         uint256 Price;
//         bool sold;
//     }

//     event idTicketItemCreated(
//         uint256 indexed tokenId,
//         address seller,
//         address owner,
//         string EventName,
//         string venue,
//         uint256 Price,
//         bool sold
//     );

//     modifier onlyOwner() {
//         require(
//             msg.sender == owner,
//             "only owner of the marketplace can change the listing price"
//         );
//         _;
//     }

//     constructor() ERC721("NFT Tickets", "NFTtkt") {
//         owner == payable(msg.sender);
//     }

//     // function createTicket(uint _Eventindex) public payable returns (uint256) {
//     //     _ticketsIds.increment();

//     //     uint256 newTicketId = _ticketsIds.current();

//     //     _mint(msg.sender, newTicketId);
//     //     // _setTokenURI(newTicketId, index);

//     //     createTicketItem(_Eventindex, newTicketId, Price, eventName, venue);

//     //     return newTicketId;
//     // }

//     //CREATING MARKET ITEMS

//     // function createTicketItem(
//     //     uint _index,
//     //     uint256 ticketId,
//     //     uint256 _Price,
//     //     string memory event_name,
//     //     string memory _venue
//     // ) private {
//     //     _Price = events[_index].price;
//     //     require(_Price > 0, "Price must be at least 1");
//     //     require(_index < events.length, "Index out of bounds");

//     //     idTicketItem[ticketId] = TicketItem(
//     //         ticketId,
//     //         payable(msg.sender),
//     //         payable(address(this)),
//     //         event_name,
//     //         _venue,
//     //         Price,
//     //         false
//     //     );

//     //     _transfer(msg.sender, address(this), ticketId);

//     //     emit idTicketItemCreated(
//     //         ticketId,
//     //         msg.sender,
//     //         address(this),
//     //         eventName,
//     //         venue,
//     //         Price,
//     //         false
//     //     );
//     // }

//     //get balance
//     function getBalance(address sent) public view returns (uint) {
//         return sent.balance;
//     }

//     //FUNCTION CREATEMARKETSALE

//     function createTicketSale(uint256 ticketId) public payable {
//         uint256 price = idTicketItem[ticketId].Price;

//         require(
//             msg.value == price,
//             "Please submit the asking price in order to complete the purchase"
//         );

//         idTicketItem[ticketId].owner = payable(msg.sender);
//         idTicketItem[ticketId].sold = true;
//         idTicketItem[ticketId].owner = payable(address(0));

//         _ticketsSold.increment();

//         _transfer(address(this), msg.sender, ticketId);

//         // payable(owner).transfer(listingPrice);
//         payable(idTicketItem[ticketId].seller).transfer(msg.value);
//     }

//     //Function Get ticket
//     // function getTicket(uint _index, uint amount) public payable {
//     //     amount = events[_index].price;
//     //     address to = events[_index].sender;
//     //     (bool sent, ) = to.call{value: msg.value}("");
//     //     require(msg.sender == to, "You cant send to yourself");
//     //     // require(msg.value== amount,"insufficient amount");
//     //     require(sent, "failed to send");
//     //     if (sent) {
//     //         createTicket(_index);
//     //     } else {
//     //         revert("Cannot");
//     //     }
//     // }

//     // function getAmount(uint _index) public view returns (uint) {
//     //     // TODO: Error check
//     //     require(_index < events.length, "Index out of bounds");
//     //     uint amount = events[_index].price;
//     //     return amount;
//     // }

//     // utils

//     function convertStringToUint(
//         string memory _str
//     ) public pure returns (uint256) {
//         bytes memory bytesValue = bytes(_str);
//         return abi.decode(bytesValue, (uint256));
//     }
// }


pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BlocTickets is Ownable {
    struct Event {
        uint id;
        address organizer;
        string name;
        string description;
        uint date;
        uint price;
        uint ticketsAvailable;
    }

    Event[] public events;
    uint public nextEventId;

    function createEvent(
        string memory name,
        string memory description,
        uint date,
        uint price,
        uint ticketsAvailable
    ) public {
        require(date > block.timestamp, "Event date should be in the future");
        require(ticketsAvailable > 0, "Tickets available should be greater than zero");

        events.push(Event(
            nextEventId,
            msg.sender,
            name,
            description,
            date,
            price,
            ticketsAvailable
        ));
        nextEventId++;
    }

    function buyTicket(uint eventId) public payable {
        Event storage _event = events[eventId];
        require(msg.value == _event.price, "Incorrect Ether value sent");
        require(_event.ticketsAvailable > 0, "No tickets available");

        _event.ticketsAvailable--;
        payable(_event.organizer).transfer(msg.value);
    }

    function getEvent(uint eventId) public view returns (
        uint,
        address,
        string memory,
        string memory,
        uint,
        uint,
        uint
    ) {
        // Event storage _event = events[eventId];
        return (
            events[eventId].id,
            events[eventId].organizer,
            events[eventId].name,
            events[eventId].description,
            events[eventId].date,
            events[eventId].price,
            events[eventId].ticketsAvailable
        );
    }

    function getAllEvents() public view returns (Event[] memory) {
        return events;
    }
}
