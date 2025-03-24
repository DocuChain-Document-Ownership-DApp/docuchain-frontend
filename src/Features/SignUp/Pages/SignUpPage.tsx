import Threads from "@/blocks/Backgrounds/Threads/Threads.tsx";
import RotatingText from "@/blocks/TextAnimations/RotatingText/RotatingText.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {SignupContainer} from "@/Features/SignUp/Components/Functional/SignupContainer.tsx";

const SignUpPage = () => {
    return (
        <div className="min-w-screen min-h-screen relative">
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <Threads
                    amplitude={4}
                    distance={0}
                    enableMouseInteraction={false}
                    color={[2, 3, 96]}
                />e
            </div>
            <div className="grid grid-cols-12 min-h-screen items-center z-2 relative">
                <div className="col-span-4 col-start-2 text-left">
                    <em>
                        <p className="font-serif text-7xl leading text-[#162660]">
                            Revolutionizing
                        </p>
                        <RotatingText
                            texts={['Document', 'Registry']}
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
                <div className="col-span-5 col-start-7">
                    <Card className="min-w-md backdrop-blur-sm bg-transparent shadow-none">
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl font-[montserrat]">Join the Revolution</CardTitle>
                        </CardHeader>
                        <CardContent>

                            <SignupContainer/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
        ;
};

export default SignUpPage;
