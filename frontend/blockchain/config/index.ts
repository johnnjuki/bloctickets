import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage, http } from 'wagmi'
import { mainnet, sepolia, arbitrumSepolia } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
// TODO: MOVE TO .env
export const projectId = "97712fd9a052670ee82d4a078462ba99"

if (!projectId) throw new Error('Project ID is not defined')

// TODO
const metadata = {
    name: 'Ticketopia',
    description: 'Ticketing system for Web3',
    url: '', // origin must match your domain & subdomain
    icons: ['']
}

// Create wagmiConfig
const chains = [mainnet, sepolia] as const
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [arbitrumSepolia.id]: http(),
    },
    storage: createStorage({
        storage: cookieStorage
    }),

})