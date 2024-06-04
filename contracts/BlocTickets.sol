// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BlocTickets is Ownable {
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
    }

    Event[] public events;
    uint public nextEventId;

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

        events.push(Event({
            id: nextEventId,
            organizer: msg.sender,
            name: name,
            venue: venue,
            category: category,
            date: date,
            time: time,
            price: price,
            ticketsAvailable: ticketsAvailable,
            description: description,
            ticketHolders: new address[](0)
        }));
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
        address[] memory
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
            _event.ticketHolders
        );
    }

    function getAllEvents() public view returns (Event[] memory) {
        return events;
    }

    function getEventsByOrganizer(address organizer) public view returns (Event[] memory) {
        uint count = 0;
        for (uint i = 0; i < events.length; i++) {
            if (events[i].organizer == organizer) {
                count++;
            }
        }

        Event[] memory result = new Event[](count);
        uint index = 0;
        for (uint i = 0; i < events.length; i++) {
            if (events[i].organizer == organizer) {
                result[index] = events[i];
                index++;
            }
        }
        return result;
    }
}






