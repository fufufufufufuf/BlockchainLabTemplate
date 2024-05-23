// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter private _voterId;
    Counters.Counter private _candidateId;

    address public votingOrganizer;

    struct Candidate {
        uint256 candidateId;
        uint256 voteCount;
        string age;
        string name;
        string image;
        address candidateAddress;
        string ipfs;
    }

    struct Voter {
        uint256 voterId;
        uint256 allowed;
        uint256 vote;
        string name;
        string image;
        address voterAddress;
        bool voted;
        string ipfs;
    }

    event CandidateCreated(
        uint256 indexed candidateId,
        uint256 voteCount,
        string age,
        string name,
        string image,
        address candidateAddress,
        string ipfs
    );

    event VoterCreated(
        uint256 indexed voterId,
        uint256 allowed,
        uint256 vote,
        string name,
        string image,
        address voterAddress,
        bool voted,
        string ipfs
    );

    address[] public candidateAddresses;
    mapping(address => Candidate) public candidates;

    address[] public votedVoters;
    address[] public voterAddresses;
    mapping(address => Voter) public voters;

    constructor() {
        votingOrganizer = msg.sender;
    }

    function setCandidate(
        address _address,
        string memory _age,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(votingOrganizer == msg.sender, "Only Organizer can create candidates");

        _candidateId.increment();
        uint256 idNumber = _candidateId.current();

        Candidate storage candidate = candidates[_address];
        candidate.candidateId = idNumber;
        candidate.age = _age;
        candidate.name = _name;
        candidate.image = _image;
        candidate.voteCount = 0;
        candidate.candidateAddress = _address;
        candidate.ipfs = _ipfs;

        candidateAddresses.push(_address);

        emit CandidateCreated(
            idNumber,
            0,
            _age,
            _name,
            _image,
            _address,
            _ipfs
        );
    }

    function getCandidates() public view returns (address[] memory) {
        return candidateAddresses;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddresses.length;
    }

    function getCandidateData(address _address) public view returns (
        string memory,
        string memory,
        uint256,
        string memory,
        uint256,
        string memory,
        address
    ) {
        Candidate storage candidate = candidates[_address];
        return (
            candidate.age,
            candidate.name,
            candidate.candidateId,
            candidate.image,
            candidate.voteCount,
            candidate.ipfs,
            candidate.candidateAddress
        );
    }

    function giveVoterRight(
        address _address,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(votingOrganizer == msg.sender, "Only organizer can create voters");

        _voterId.increment();
        uint256 idNumber = _voterId.current();

        Voter storage voter = voters[_address];
        require(voter.allowed == 0, "Voter already allowed");

        voter.voterId = idNumber;
        voter.allowed = 1;
        voter.name = _name;
        voter.image = _image;
        voter.voterAddress = _address;
        voter.vote = 0;
        voter.voted = false;
        voter.ipfs = _ipfs;

        voterAddresses.push(_address);

        emit VoterCreated(
            idNumber,
            1,
            0,
            _name,
            _image,
            _address,
            false,
            _ipfs
        );
    }

    function vote(address _candidateAddress) external {
        Voter storage voter = voters[msg.sender];
        require(!voter.voted, "You have already voted");
        require(voter.allowed != 0, "You have no right to vote");

        voter.voted = true;
        voter.vote = candidates[_candidateAddress].candidateId;

        votedVoters.push(msg.sender);
        candidates[_candidateAddress].voteCount += voter.allowed;
    }

    function getVoterLength() public view returns (uint256) {
        return voterAddresses.length;
    }

    function getVoterData(address _address) public view returns (
        uint256,
        string memory,
        string memory,
        address,
        string memory,
        uint256,
        bool
    ) {
        Voter storage voter = voters[_address];
        return (
            voter.voterId,
            voter.name,
            voter.image,
            voter.voterAddress,
            voter.ipfs,
            voter.allowed,
            voter.voted
        );
    }

    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    function getVoterList() public view returns (address[] memory) {
        return voterAddresses;
    }
}
