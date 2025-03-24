import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {
    useGenerateNonceMutation,
    useVerifySignatureMutation,
} from '@/Features/SignIn/API/authApi';
import {
    setError,
    setLoading,
    setTokens,
    setWalletAddress,
} from '@/store/authSlice';
import {toast} from 'sonner';
import SignInView from "@/Features/SignIn/Components/Presentational/SignInView";
import {useNavigate} from "react-router-dom";

const useSignInLogic = () => {
    const dispatch = useDispatch();
    const {loading, error, accessToken} = useSelector((state: RootState) => state.auth);
    const [generateNonce] = useGenerateNonceMutation();
    const [verifySignature] = useVerifySignatureMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/home");
        }
    }, [accessToken, navigate]);

    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            dispatch(setError('MetaMask is not installed'));
            throw new Error('MetaMask is not installed');
        }

        try {
            const accounts: string[] = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            dispatch(setWalletAddress(accounts[0]));
            return accounts[0];
        } catch (err) {
            dispatch(setError('Error connecting to MetaMask'));
            throw err;
        }
    };

    const signMessage = async (nonce: string, walletAddress: string) => {
        try {
            const signature = await window.ethereum?.request({
                method: 'personal_sign',
                params: [nonce, walletAddress],
            });
            return signature;
        } catch (err) {
            dispatch(setError('Error signing message'));
            throw err;
        }
    };

    const handleLogin = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const walletAddress = await connectWallet();
            const {nonce} = await generateNonce(walletAddress).unwrap();
            const signature = await signMessage(nonce, walletAddress);
            const {accessToken, refreshToken} = await verifySignature({
                walletAddress,
                signature,
                nonce,
            }).unwrap();

            dispatch(setTokens({accessToken, refreshToken}));
            dispatch(setLoading(false));

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('walletAddress', walletAddress);

            toast.info('Signed in Successfully!');
            navigate("/home");
        } catch (err) {
            dispatch(
                setError(err instanceof Error ? err.message : 'Failed to login')
            );
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {loading, error, handleLogin};
};

const SignIn: React.FC = () => {
    const {loading, error, handleLogin} = useSignInLogic();
    return <SignInView loading={loading} error={error} handleLogin={handleLogin}/>;
};

export default SignIn;
