import React, {useState} from 'react';
import {toast} from "sonner";
import {useSignupMutation, useVerifyEmailMutation} from "@/Features/SignUp/API/authApi";
import {useMetaMask} from "@/Features/SignUp/hooks/useMetaMask";
import {SignupForm} from "@/Features/SignUp/Components/Presentational/SignupForm.tsx";
import {useNavigate} from "react-router-dom";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {Button} from "@/components/ui/button";

export const SignupContainer: React.FC = () => {
    const [signup, {isLoading: isSignupLoading}] = useSignupMutation();
    const [verifyEmail, {isLoading: isVerifyingEmail}] = useVerifyEmailMutation();
    const {connectWallet} = useMetaMask();
    const navigate = useNavigate();
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [otp, setOtp] = useState('');
    const [completeFormData, setCompleteFormData] = useState<FormData | null>(null);

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

    // Handle email verification
    const handleEmailVerification = async (formData: FormData) => {
        try {
            const email = formData.get('email') as string;
            // Store the complete form data for later use
            setCompleteFormData(formData);

            const response = await verifyEmail({email}).unwrap();
            if (response.sent) {
                toast.success('Verification email sent!');
                setShowOtpForm(true);
            } else {
                toast.error('Failed to send verification email');
            }
        } catch (error) {
            console.error('Email verification failed:', error);
            toast.error('Failed to send verification email');
        }
    };

    // Handle OTP submission
    const handleOtpSubmit = async () => {
        if (otp.length !== 6 || !/^\d+$/.test(otp)) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        if (!completeFormData) {
            toast.error('Form data is missing. Please try again.');
            setShowOtpForm(false);
            return;
        }

        try {
            // Create a new FormData instance with all the original data
            const finalFormData = new FormData();

            // Copy all entries from the original form data
            for (const [key, value] of completeFormData.entries()) {
                finalFormData.append(key, value);
            }

            // Add the OTP
            finalFormData.append('otp', otp);

            const response = await signup(finalFormData).unwrap();
            if (response && response.success) {
                toast.success('Signup successful!');
                navigate('/signin');
            } else {
                toast.error('Signup failed. Please try again.');
                setShowOtpForm(false);
            }
        } catch (error) {
            console.error('Signup failed:', error);
            toast.error('Signup failed. Please try again.');
            setShowOtpForm(false);
        }
    };

    if (showOtpForm) {
        return (<div className="flex items-center justify-center">
                <div className="text-center">
                    <h5 className="scroll-m-20 text-l font-semibold tracking-tight mb-6">Enter Verification Code</h5>
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <InputOTP
                                maxLength={6}
                                value={otp}
                                onChange={setOtp}
                                containerClassName="gap-2"
                            >
                                <InputOTPGroup>
                                    {Array.from({length: 3}).map((_, index) => (
                                        <InputOTPSlot key={index} index={index}/>
                                    ))}
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    {Array.from({length: 3}).map((_, index) => (
                                        <InputOTPSlot key={index + 3} index={index + 3}/>
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <Button
                            className="w-full"
                            onClick={handleOtpSubmit}
                            disabled={isSignupLoading || otp.length !== 6}
                        >
                            {isSignupLoading ? 'Verifying...' : 'Verify & Sign Up'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <SignupForm
            connectMetaMask={handleConnectMetaMask}
            onSubmit={handleEmailVerification}
            isSubmitting={isVerifyingEmail}
        />
    );
};