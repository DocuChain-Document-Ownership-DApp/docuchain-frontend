import {Box, Home, Info, LogOut, Signature, UserRoundIcon} from "lucide-react";
import {Card} from "@/components/ui/card.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {clearAuthData} from "@/store/authSlice.ts";
import {useDispatch} from "react-redux";

const AppNavBar = () => {
    const Navigate = useNavigate();
    const Location = useLocation();
    const dispatch = useDispatch();

    const items = [
        {icon: <Home size={18}/>, label: 'Home', url: '/home'},
        {icon: <Signature size={18}/>, label: 'My Docs', url: '/docs'},
        {icon: <UserRoundIcon size={18}/>, label: 'Profile', url: '/'},
        {icon: <Info size={18}/>, label: 'About Us', url: '/'},
    ];

    return (
        <>
            <Card
                className="flex flex-row rounded-2xl select-none shadow-none absolute top-4 left-4 right-4 gap-2 p-2 backdrop-blur-sm bg-transparent items-center justify-between border-none z-1">
                <div className="flex flex-row px-2 gap-2" onClick={() => Navigate("/")}>
                    <Box/>
                    <h3 className="font-[montserrat] font-medium ">
                        DocuChain
                    </h3>
                </div>
                <div className="flex flex-row gap-2">
                    {items.map((item) => (
                        <Button key={item.url}
                                onClick={() => {
                                    Navigate(item.url)
                                }}
                                className={Location.pathname == item.url ? "": "bg-white text-[#162660] shadow-none rounded-full "}>
                            {item.icon}
                            {item.label}
                        </Button>
                    ))}
                </div>
                <Button className="bg-transparent shadow-none backdrop-blur-sm text-[#162660] rounded-full"
                        onClick={() => {
                            dispatch(clearAuthData())
                        }}>
                    <LogOut/>
                    Log Out
                </Button>
            </Card>
        </>
    )
}

export default AppNavBar