import Threads from "@/blocks/Backgrounds/Threads/Threads.tsx";
import RotatingText from "@/blocks/TextAnimations/RotatingText/RotatingText.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import SignIn from "@/Features/SignIn/Components/Functional/SignIn.tsx";

const SignInPage = () => {
    return (

        <div className="min-w-screen min-h-screen relative">
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <Threads
                    amplitude={4}
                    distance={0}
                    enableMouseInteraction={false}
                    color={[2, 3, 96]}
                />
            </div>
            <div className="grid grid-cols-12 min-h-screen items-center z-2 relative">
                <div className="col-span-6 col-start-2 text-left">
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
                            className="font-serif text-7xl leading text-[#162660]"
                        />
                        <p className="font-serif text-7xl leading text-[#162660]">
                            Management
                        </p>
                    </em>
                </div>
                <div className="col-span-3 col-start-9">
                    <Card className="min-w-md backdrop-blur-sm bg-transparent shadow-none">
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl font-[montserrat]">Welcome back</CardTitle>
                            <CardDescription>
                                Login with your Metamask account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid gap-6">
                                    <div className="flex flex-col gap-4">
                                        <SignIn/>
                                    </div>
                                    <div className="text-center text-sm">
                                        Don&apos;t have an account?{" "}
                                        <a href="/signup" className="underline underline-offset-4">
                                            Sign up
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
