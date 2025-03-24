import React from 'react';
import {toast} from "sonner";
import {useSignupMutation} from "@/Features/SignUp/API/authApi";
import {useMetaMask} from "@/Features/SignUp/hooks/useMetaMask";
import {SignupForm} from "@/Features/SignUp/Components/Presentational/SignupForm.tsx";
import {useNavigate} from "react-router-dom";

export const SignupContainer: React.FC = () => {
    const [signup, {isLoading}] = useSignupMutation();
    const {connectWallet} = useMetaMask();
    const navigate = useNavigate();

    // Handle MetaMask connection
    const handleConnectMetaMask = async (): Promise<string> => {
        try {
            return await connectWallet();
        } catch (error) {
            console.error('MetaMask connection failed:', error);
            toast.error('Failed to connect MetaMask');
            return '';
        }
    };

    // Handle form submission
    const handleSubmit = async (formData: FormData): Promise<void> => {
        try {
            const response = await signup(formData).unwrap();
            if (response && response.success) {
                toast.success('Signup successful!');
                navigate('/signin');

            } else {
                toast.error('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            toast.error('Signup failed. Please try again.');
        }
    };

    return (
        <SignupForm
            connectMetaMask={handleConnectMetaMask}
            onSubmit={handleSubmit}
            isSubmitting={isLoading}
        />
    );
};