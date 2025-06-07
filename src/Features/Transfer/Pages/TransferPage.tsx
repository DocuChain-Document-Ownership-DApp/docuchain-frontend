import TransferForm from "@/Features/Transfer/Components/Functional/TransferForm.tsx";

const TransferPage = () => {
    return (
        <div className="grid grid-cols-1 gap-4">
            <h2 className="font-serif scroll-m-20 text-4xl tracking-tight">Transfer Document Ownership</h2>
            <TransferForm/>
        </div>
    )
}

export default TransferPage