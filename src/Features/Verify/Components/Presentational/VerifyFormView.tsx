import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface VerifyFormValues {
    docId: string;
}

interface VerifyFormViewProps {
    onSubmit: (values: VerifyFormValues) => void;
    isLoading: boolean;
    showOtpForm: boolean;
    otp: string;
    onOtpChange: (value: string) => void;
    onOtpSubmit: () => void;
    isOtpSubmitting: boolean;
    verificationResult: any;
    showResult: boolean;
    onCloseResult: () => void;
}

const VerifyFormView: React.FC<VerifyFormViewProps> = ({
    onSubmit,
    isLoading,
    showOtpForm,
    otp,
    onOtpChange,
    onOtpSubmit,
    isOtpSubmitting,
    verificationResult,
    showResult,
    onCloseResult,
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSubmit({
            docId: formData.get('docId') as string,
        });
    };

    if (showOtpForm) {
        return (
            <Card>
                <CardContent>
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <h5 className="scroll-m-20 text-l font-semibold tracking-tight mb-6">Enter Verification Code</h5>
                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <InputOTP
                                        maxLength={6}
                                        value={otp}
                                        onChange={onOtpChange}
                                        containerClassName="gap-2"
                                    >
                                        <InputOTPGroup>
                                            {Array.from({ length: 3 }).map((_, index) => (
                                                <InputOTPSlot key={index} index={index} />
                                            ))}
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            {Array.from({ length: 3 }).map((_, index) => (
                                                <InputOTPSlot key={index + 3} index={index + 3} />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <Button
                                    className="w-full"
                                    onClick={onOtpSubmit}
                                    disabled={isOtpSubmitting || otp.length !== 6}
                                >
                                    {isOtpSubmitting ? 'Verifying...' : 'Verify Document'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="docId" className="text-sm font-medium">
                                Document ID
                            </label>
                            <Input
                                id="docId"
                                name="docId"
                                placeholder="Enter 66-character document ID starting with 0x"
                                required
                                pattern="^0x[a-fA-F0-9]{64}$"
                                title="Document ID must be 66 characters long and start with 0x"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Verifying...' : 'Verify Document'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Dialog open={showResult} onOpenChange={onCloseResult}>
                <DialogContent className="min-w-3xl max-h-[80vh] [&>button]:hidden">
                    <DialogHeader className="flex flex-row items-center justify-between">
                        <DialogTitle>Document Verification Result</DialogTitle>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <X className="h-4 w-4" />
                            </Button>
                        </DialogClose>
                    </DialogHeader>
                    {verificationResult && (
                        <ScrollArea className="h-[60vh] pr-4">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Document Details</h3>
                                        <div className="space-y-2">
                                            <p className="break-all">
                                                <span className="font-medium">Document ID:</span><br />
                                                {verificationResult.document.docId}
                                            </p>
                                            <p>
                                                <span className="font-medium">Document Code:</span><br />
                                                {verificationResult.document.doc_code}
                                            </p>
                                            <p>
                                                <span className="font-medium">File Name:</span><br />
                                                {verificationResult.document.fileName}
                                            </p>
                                            <p>
                                                <span className="font-medium">File Type:</span><br />
                                                {verificationResult.document.fileType}
                                            </p>
                                            <p>
                                                <span className="font-medium">File Size:</span><br />
                                                {(verificationResult.document.fileSize / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                            <p className="break-all">
                                                <span className="font-medium">Issuer:</span><br />
                                                {verificationResult.document.issuer}
                                            </p>
                                            <p className="break-all">
                                                <span className="font-medium">Recipient:</span><br />
                                                {verificationResult.document.recipient}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Owner Details</h3>
                                        <div className="space-y-2">
                                            <p>
                                                <span className="font-medium">Name:</span><br />
                                                {verificationResult.owner.name}
                                            </p>
                                            <p>
                                                <span className="font-medium">UID:</span><br />
                                                {verificationResult.owner.uid}
                                            </p>
                                            <p>
                                                <span className="font-medium">DOB:</span><br />
                                                {new Date(verificationResult.owner.dob).toLocaleDateString()}
                                            </p>
                                            <p className="break-all">
                                                <span className="font-medium">Wallet Address:</span><br />
                                                {verificationResult.owner.walletAddress}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {verificationResult.owner.photo && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-lg mb-2">Owner Photo</h3>
                                        <img
                                            src={`data:${verificationResult.owner.photo.type};base64,${verificationResult.owner.photo.data}`}
                                            alt="Owner"
                                            className="max-w-xs rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default VerifyFormView; 