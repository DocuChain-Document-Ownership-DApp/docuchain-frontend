import {Button} from "@/components/ui/button.tsx";
import {Box, LogIn} from "lucide-react";

const SignInView: React.FC<{
    loading: boolean;
    error: string | null;
    handleLogin: () => void;
}> = ({loading, error, handleLogin}) => {
    return (
        <div>
            <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full text-center text-sm bg-[#162660]"
            >
                {loading ? (
                    <span className="flex flex-row gap-2 items-center font-normal">
            <Box className="animate-spin"/>
            Signing In
          </span>
                ) : (
                    <span className="flex flex-row gap-2 items-center font-normal">
            <LogIn/>
            Sign in with MetaMask
          </span>
                )}
            </Button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignInView;