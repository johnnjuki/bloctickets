// utils/contract.js
import { createPublicClient, createWalletClient, custom } from 'viem';
import { celoAlfajores } from 'viem/chains';
import BlocTicketsABI from '../../artifacts/contracts/BlocTickets.sol/BlocTickets.json';

const contractAddress = 'your-contract-address'; // Replace with your deployed contract address

export const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: custom(window.ethereum),
});

export const walletClient = createWalletClient({
  chain: celoAlfajores,
  transport: custom(window.ethereum),
});

export const getContract = (client) => {
  return {
    address: contractAddress,
    abi: BlocTicketsABI.abi,
    client,
  };
};
