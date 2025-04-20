import { toast } from "sonner";
import { useTransferDocumentMutation } from "@/Features/Transfer/API/TransferAPI.tsx";
import TransferFormView, {TransferFormValues} from "@/Features/Transfer/Components/Presentational/TransferFormView.tsx";

const TransferFormContainer = () => {
    const [transferDocument, { isLoading }] = useTransferDocumentMutation();

    const handleSubmit = async (values: TransferFormValues) => {
        try {
            await transferDocument(values).unwrap();
            toast.success("Transfer Successful");
        } catch (error) {
            console.error("Transfer failed:", error);
            toast.error("Transfer Failed");
        }
    };

    return (
        <TransferFormView
            onSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
};

export default TransferFormContainer;
