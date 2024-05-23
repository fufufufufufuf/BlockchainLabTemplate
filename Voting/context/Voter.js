import React, { useState, useEffect, createContext } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';

import { VotingAddress, VotingAddressABI } from './constants';

// Replace these with your Infura Project ID and Secret
const projectId = '8681ff7413d448e3b2c42a4895c9cdc9';
const projectSecret = '2/BCmjC8YhXTaL6dkkiBNR71CApsBTyf6v4fEwChVvTxSN8kXZG6dA';

const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const pushVoter = [];
  const votingTitle = "My first smart contract app";
  const [currentAccount, setCurrentAccount] = useState('');
  const [candidateArray, setCandidateArray] = useState([]);
  const [candidateLength, setCandidateLength] = useState('');
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState('');
  const [voterAddress, setVoterAddress] = useState([]);
  const [error, setError] = useState('');

  const router = useRouter();
  

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError('Please install MetaMask');

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        setError('Please connect to MetaMask');
      }
    } catch (error) {
      setError('An error occurred while checking wallet connection');
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return setError('Please install MetaMask');

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      setError('An error occurred while connecting to MetaMask');
    }
  };

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError('Error uploading file to IPFS');
    }
  };

  const uploadToIPFSCandidate = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError('Error uploading file to IPFS');
    }
  };

  const createVoter = async (formInput, fileUrl, router) => {
    try {
      const { name, address, position } = formInput;
      if (!name || !address || !position) return setError('Input data missing');

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = JSON.stringify({name, address, position, image: fileUrl});
      const added = await client.add(data);
      const url = 'https://ipfs.infura.io/ipfs/${added.path}';

      const voter = await contract.voterRight(address, name, url, fileUrl);
      voter.wait()

      router.push("/voterList");

      // Assuming you will interact with the contract here
    } catch (error) {
      setError('Error in creating voter');
    }
  };

  const getAllVoterData = async()=> {
    try{
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const voterListData = await contract.getVoterList();
        setVoterAddress(voterListData);

        voterListData.map(async(eL)=>{
            const singleVoterData = await contract.getAllVoterData(eL);
            pushVoter.push(singleVoterData);
        })

        const voterList = await contract.getVoterLength();
        setVoterLength(voterList.toNumber());
    } catch (error) {
        setError('Something wrong');
    }
  };

//   useEffect(() =>{
//     getAllVoterData();
//   }, []);

  const giveVote = async(id) =>{
    try{
      const voterAddress = id.address;
      const voterId = id.id;
      const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const voteredList = await contract.vote(voterAddress, voterId);
    }catch(error){
        console.log(error)
    }
  }

  const setCandidate = async (candidateForm, fileUrl, router) => {
    try {
      const { name, address, age } = candidateForm;
      if (!name || !address || !age) return setError('Input data missing');

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = JSON.stringify({name, address,  image: fileUrl, age});
      const added = await client.add(data);
      const ipfs = 'https://ipfs.infura.io/ipfs/${added.path}';

      const candidate = await contract.setCandidate(address, age, name, fileUrl, ipfs);
      candidate.wait()

      router.push("/");

      // Assuming you will interact with the contract here
    } catch (error) {
      setError('Error in creating voter');
    }
  };

  const getNewCandidate = async()=>{
    try{
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const allCandidate = await contract.getCandidate();
        allCandidate.map(async(eL)=>{
            const singleCandidateData = await contract.getCandidateData(eL);
            pushCandidate.push(singleCandidateData);
            candidateIndex.push(singleCandidateData[2].toNumber());
        });

        const alllCandidateLength = await contract.getCandidateLength();
        setCandidateLength(alllCandidateLength.toNumber());
      
    }catch(error){
        console.log(error)
    };
  }

  useEffect(()=>{
    getNewCandidate();
  }, []);

  return (
    <VotingContext.Provider
      value={{
        votingTitle,
        currentAccount,
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIPFS,
        createVoter,
        getAllVoterData,
        giveVote,
        setCandidate,
        getNewCandidate,
        error,
        voterArray,
        voterLength,
        voterAddress,
        currentAccount,
        candidateLength,
        candidateArray,
        uploadToIPFSCandidate
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
