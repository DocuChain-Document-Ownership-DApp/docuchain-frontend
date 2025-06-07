import {Box, Home, Info, LogIn, LogOut, Send, Signature, UserRoundIcon} from "lucide-react";
import {Card} from "@/components/ui/card.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {clearAuthData} from "@/store/authSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";

const AppNavBar = () => {
    const Nav = useNavigate();
    const Location = useLocation();
    const dispatch = useDispatch();

    const authToken = useSelector((state: RootState) => state.auth.accessToken);

    // Items shown only when user is authenticated
    const items = authToken ? [
        {icon: <Home size={18}/>, label: 'Home', url: '/home'},
        {icon: <Signature size={18}/>, label: 'My Docs', url: '/docs'},
        {icon: <Send size={18}/>, label: 'Transfer', url: '/transfer'},
        // {icon: <UserRoundIcon size={18}/>, label: 'Profile', url: '/profile'},
        {icon: <Info size={18}/>, label: 'About Us', url: '/about_us'},
    ] : [
        {icon: <Info size={18}/>, label: 'About Us', url: '/about_us'},
    ];

    return (
        <>
            <Card
                className="flex flex-row rounded-full select-none shadow-none absolute top-10 left-10 right-10 gap-4 p-4 backdrop-blur-sm bg-[#D0E6FD] items-center justify-between border-none z-1">
                <div className="flex flex-row px-2 gap-2 cursor-pointer" onClick={() => Nav("/")}>
                    <Box/>
                    <h3 className="font-[montserrat] font-medium">
                        DocuChain
                    </h3>
                </div>

                <div className="flex flex-row gap-2">
                    {items.map((item) => (
                        <Button key={item.url}
                                onClick={() => Nav(item.url)}
                                className={Location.pathname === item.url ? "shadow-none" : "bg-transparent text-[#162660] shadow-none rounded-full "}>
                            {item.icon}
                            {item.label}
                        </Button>
                    ))}
                </div>
                <div className="bg-background rounded-full">
                    {authToken ? (
                        <Button className="bg-transparent shadow-none backdrop-blur-sm text-[#162660] rounded-full"
                                onClick={() => dispatch(clearAuthData())}>
                            <LogOut/>
                            Log Out
                        </Button>
                    ) : (
                        <Button
                            className="bg-transparent shadow-none backdrop-blur-sm rounded-full text-accent-foreground"
                            onClick={() => Nav("/signin")}>
                            <LogIn/>
                            Sign In
                        </Button>
                    )}
                </div>
            </Card>
        </>
    );
}

export default AppNavBar;
