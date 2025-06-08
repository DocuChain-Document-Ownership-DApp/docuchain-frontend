import { useState } from 'react';
import { toast } from 'sonner';
import { useVerifyDocumentQuery, useVerifyOTPMutation } from '@/Features/Verify/API/VerifyAPI';
import VerifyFormView, { VerifyFormValues } from '@/Features/Verify/Components/Presentational/VerifyFormView';
import React from 'react';

const VerifyFormContainer = () => {
    const [docId, setDocId] = useState<string>('');
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [otp, setOtp] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [verificationResult, setVerificationResult] = useState<any>(null);

    const { data: verifyResponse, isLoading: isVerifying } = useVerifyDocumentQuery(docId, {
        skip: !docId,
    });

    const [verifyOTP, { isLoading: isOtpSubmitting }] = useVerifyOTPMutation();

    const handleSubmit = async (values: VerifyFormValues) => {
        try {
            setDocId(values.docId);
        } catch (error) {
            console.error('Verification failed:', error);
            toast.error('Failed to verify document');
        }
    };

    // Effect to handle verification response
    React.useEffect(() => {
        if (verifyResponse) {
            toast.success('OTP sent successfully');
            setShowOtpForm(true);
        }
    }, [verifyResponse]);

    const handleOtpSubmit = async () => {
        if (otp.length !== 6 || !/^\d+$/.test(otp)) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            const response = await verifyOTP({ docId, otp }).unwrap();
            if (response.isVerified) {
                setVerificationResult(response);
                setShowResult(true);
                setShowOtpForm(false);
                setOtp('');
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
            toast.error('Failed to verify OTP');
        }
    };

    return (
        <VerifyFormView
            onSubmit={handleSubmit}
            isLoading={isVerifying}
            showOtpForm={showOtpForm}
            otp={otp}
            onOtpChange={setOtp}
            onOtpSubmit={handleOtpSubmit}
            isOtpSubmitting={isOtpSubmitting}
            verificationResult={verificationResult}
            showResult={showResult}
            onCloseResult={() => setShowResult(false)}
        />
    );
};

export default VerifyFormContainer; 