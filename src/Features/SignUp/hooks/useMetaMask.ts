import {useState} from 'react';

interface UseMetaMaskReturn {
    connectWallet: () => Promise<string>;
    error: string | null;
}

export const useMetaMask = (): UseMetaMaskReturn => {
    const [error, setError] = useState<string | null>(null);

    const connectWallet = async (): Promise<string> => {
        if (typeof window.ethereum === 'undefined') {
            setError('MetaMask is not installed');
            throw new Error('MetaMask is not installed');
        }

        try {
            const accounts: string[] = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            return accounts[0];
        } catch (err) {
            setError('Error connecting to MetaMask');
            throw err;
        }
    };

    return {connectWallet, error};
};