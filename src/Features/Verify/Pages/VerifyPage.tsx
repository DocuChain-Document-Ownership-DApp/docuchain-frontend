import VerifyFormContainer from '../Components/Functional/VerifyFormContainer';

const VerifyPage = () => {
    return (
        <div className="grid grid-cols-1 gap-4">
            <h2 className="font-serif scroll-m-20 text-4xl tracking-tight">Verify Documents</h2>
            <div className="mt-6">
                <VerifyFormContainer />
            </div>
        </div>
    );
};

export default VerifyPage;