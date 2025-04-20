import RotatingText from "@/blocks/TextAnimations/RotatingText/RotatingText.tsx";
import Threads from "@/blocks/Backgrounds/Threads/Threads.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HeartHandshake, Lock, Orbit, Shield} from "lucide-react";
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const Navigate = useNavigate();

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full z--1">
                <Threads
                    amplitude={4}
                    distance={0}
                    enableMouseInteraction={false}
                    color={[2, 3, 96]}
                />
            </div>
            <div className="absolute top-0 left-0 w-full h-full z--1 backdrop-blur-xs"/>
            <div className="grid grid-cols-5 px-20 z-1 bac">
                <div className="col-span-3 z-1">
                    <div className="flex flex-col gap-8">
                        <em>
                            <p className="font-serif text-7xl leading text-[#162660]">
                                Revolutionizing
                            </p>
                            <RotatingText
                                texts={['Document', 'Intellectual Property', 'Registry', 'Medical Records']}
                                mainClassName="overflow-hidden py-0.5 sm:py-1 md:py-2"
                                staggerFrom={"last"}
                                initial={{y: "100%"}}
                                animate={{y: 0}}
                                exit={{y: "-120%"}}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{type: "spring", damping: 30, stiffness: 400}}
                                rotationInterval={4000}
                                className="font-serif text-7xl leading text-[#162660] z-1"
                            />
                            <p className="font-serif text-7xl leading text-[#162660]">
                                Management
                            </p>
                        </em>
                        <h2 className="font-medium text-slate-600">
                            Effortlessly Store, Access, and Secure Your Documents Using the Power of Blockchain &
                            NFTs.
                        </h2>
                        <div className="flex items-center gap-4">
                            <Button className="bg-[#D0E6FD] text-accent-foreground" onClick={() => {
                                Navigate("/signin")
                            }}>
                                Get Started
                            </Button>
                            <span className="font-medium cursor-pointer" onClick={() => {
                                Navigate("/about_us")
                            }}>About Us</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-col gap-2 items-center">
                                    <div className="bg-[#D0E6FD] rounded-full p-6">
                                        <Shield size="30"/>
                                    </div>
                                    <span className="font-medium">
                                        Secure
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-col gap-2 items-center">
                                    <div className="bg-[#D0E6FD] rounded-full p-6">
                                        <Orbit size="30"/>
                                    </div>
                                    <span className="font-medium">
                                        Decentralized
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-col gap-2 items-center">
                                    <div className="bg-[#D0E6FD] rounded-full p-6">
                                        <Lock size="30"/>
                                    </div>
                                    <span className="font-medium">
                                        Tamper Proof
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-col gap-2 items-center">
                                    <div className="bg-[#D0E6FD] rounded-full p-6">
                                        <HeartHandshake size="30"/>
                                    </div>
                                    <span className="font-medium">
                                        Trustworthy
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 z-1">
                    <img src="src/assets/11667132_20943447.svg"/>
                </div>
            </div>
        </>
    )
}

export default LandingPage;