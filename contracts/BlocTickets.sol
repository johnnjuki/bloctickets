// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlocTickets is ERC721URIStorage, Ownable {
    struct Event {
        uint id;
        address organizer;
        string name;
        string venue;
        string category;
        uint date;
        string time;
        string price;
        uint ticketsAvailable;
        string description;
        address[] ticketHolders;
        string[] nftUris;
        mapping(address => string[]) userToNftUris; // Map user address to NFT URIs for this event
    }

    struct EventView {
        uint id;
        address organizer;
        string name;
        string venue;
        string category;
        uint date;
        string time;
        string price;
        uint ticketsAvailable;
        string description;
        address[] ticketHolders;
        string[] nftUris;
    }

    Event[] public events;
    uint public nextEventId;
    uint public nextTicketId;

    constructor() ERC721("BlocTickets", "BTK") {}

    function createEvent(
        string memory name,
        string memory venue,
        string memory category,
        uint date,
        string memory time,
        string memory price,
        uint ticketsAvailable,
        string memory description
    ) public {
        require(date > block.timestamp, "Event date should be in the future");
        require(ticketsAvailable > 0, "Tickets available should be greater than zero");

        Event storage newEvent = events.push();
        newEvent.id = nextEventId;
        newEvent.organizer = msg.sender;
        newEvent.name = name;
        newEvent.venue = venue;
        newEvent.category = category;
        newEvent.date = date;
        newEvent.time = time;
        newEvent.price = price;
        newEvent.ticketsAvailable = ticketsAvailable;
        newEvent.description = description;

        nextEventId++;
    }

    function buyTicket(uint eventId) public payable {
        Event storage _event = events[eventId];
        // require(msg.value == _event.price, "Incorrect Ether value sent");
        require(_event.ticketsAvailable > 0, "No tickets available");

        _event.ticketsAvailable--;
        _event.ticketHolders.push(msg.sender);
  
        payable(_event.organizer).transfer(msg.value);
    }

    function mintTicketNft(uint eventId, string memory nftUri) public {
        Event storage _event = events[eventId];
        _event.nftUris.push(nftUri);
        _event.userToNftUris[msg.sender].push(nftUri);

        uint ticketId = nextTicketId;
        _mint(msg.sender, ticketId);
        _setTokenURI(ticketId, nftUri);

        nextTicketId++;
    }

    function getEvent(uint eventId) public view returns (
        uint,
        address,
        string memory,
        string memory,
        string memory,
        uint,
        string memory,
        string memory,
        uint,
        string memory,
        address[] memory,
        string[] memory
    ) {
        Event storage _event = events[eventId];
        return (
            _event.id,
            _event.organizer,
            _event.name,
            _event.venue,
            _event.category,
            _event.date,
            _event.time,
            _event.price,
            _event.ticketsAvailable,
            _event.description,
            _event.ticketHolders,
            _event.nftUris
        );
    }

    function getAllEvents() public view returns (EventView[] memory) {
        EventView[] memory result = new EventView[](events.length);
        for (uint i = 0; i < events.length; i++) {
            Event storage _event = events[i];
            result[i] = EventView(
                _event.id,
                _event.organizer,
                _event.name,
                _event.venue,
                _event.category,
                _event.date,
                _event.time,
                _event.price,
                _event.ticketsAvailable,
                _event.description,
                _event.ticketHolders,
                _event.nftUris
            );
        }
        return result;
    }

    function getUserPurchasedTickets(uint eventId, address user) public view returns (string[] memory) {
        Event storage _event = events[eventId];
        return _event.userToNftUris[user];
    }

    function getUserPurchasedEvents(address user) public view returns (EventView[] memory) {
        uint count = 0;
        for (uint i = 0; i < events.length; i++) {
            for (uint j = 0; j < events[i].ticketHolders.length; j++) {
                if (events[i].ticketHolders[j] == user) {
                    count++;
                    break;
                }
            }
        }

        EventView[] memory result = new EventView[](count);
        uint index = 0;
        for (uint i = 0; i < events.length; i++) {
            for (uint j = 0; j < events[i].ticketHolders.length; j++) {
                if (events[i].ticketHolders[j] == user) {
                    Event storage _event = events[i];
                    result[index] = EventView(
                        _event.id,
                        _event.organizer,
                        _event.name,
                        _event.venue,
                        _event.category,
                        _event.date,
                        _event.time,
                        _event.price,
                        _event.ticketsAvailable,
                        _event.description,
                        _event.ticketHolders,
                        _event.nftUris
                    );
                    index++;
                    break;
                }
            }
        }

        return result;
    }

    function getEventsByOrganizer(address organizer) public view returns (EventView[] memory) {
        uint count = 0;
        for (uint i = 0; i < events.length; i++) {
            if (events[i].organizer == organizer) {
                count++;
            }
        }

        EventView[] memory result = new EventView[](count);
        uint index = 0;
        for (uint i = 0; i < events.length; i++) {
            if (events[i].organizer == organizer) {
                Event storage _event = events[i];
                result[index] = EventView(
                    _event.id,
                    _event.organizer,
                    _event.name,
                    _event.venue,
                    _event.category,
                    _event.date,
                    _event.time,
                    _event.price,
                    _event.ticketsAvailable,
                    _event.description,
                    _event.ticketHolders,
                    _event.nftUris
                );
                index++;
            }
        }
        return result;
    }
}
