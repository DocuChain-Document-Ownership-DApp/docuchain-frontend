interface Window {
    ethereum?: {
        request: (args: { method: string; params?: unknown[] }) => Promise<string[]>;
        isMetaMask?: boolean;
    };
}
