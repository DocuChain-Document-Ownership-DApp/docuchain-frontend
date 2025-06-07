import {Box} from "lucide-react";
const AboutUsPage = () => {
    return (
        <div className="p-20">
            <div className="relative w-full h-screen overflow-hidden">
                <div className="relative z-10 grid grid-cols-5">
                    <div className="col-span-3">
                        <div className="flex flex-col gap-8">
                            <em>
                                <p className="font-serif text-7xl leading text-[#162660] mb-5">
                                    About Us
                                </p>
                            </em>
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                Securing Documents. Empowering Ownership. Revolutionizing Trust.
                            </h2>
                            <div>
                                <p className="font-medium cursor-pointer text-slate-600">
                                    At DocuChain, we believe that ownership of digital assets and documents should be
                                    secure, transparent, and tamper-proof. That’s why we’ve built a cutting-edge
                                    platform
                                    powered by blockchain technology to bring decentralized security and verifiable
                                    authenticity to your most critical documents and digital assets.
                                </p>
                            </div>
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                Who We Are
                            </h2>
                            <div>
                                <p className="font-medium cursor-pointer text-slate-600">
                                    We are a team of innovators, technologists, and visionaries passionate about
                                    leveraging distributed ledger technology to solve real-world problems. With a strong
                                    foundation in blockchain, cybersecurity, and digital trust, we aim to reshape how
                                    individuals, businesses, and institutions manage and verify ownership of their
                                    documents and assets.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <img src="src/assets/11667132_20943447.svg" alt="Illustration"/>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full py-10">
                    <div className="flex items-center w-full gap-4">
                        {/* Left Line */}
                        <div className="flex-grow border-t border-gray-300"></div>

                        {/* Center Box */}
                        <Box className="flex-shrink-0" size="100"/>

                        {/* Right Line */}
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                </div>

            </div>

            {/* New Section */}
            {/*<div className="relative w-full h-screen overflow-hidden">*/}
            {/*    <h2 className="items-center text-center text-4xl font-medium mb-8">*/}
            {/*        Our Vision*/}
            {/*    </h2>*/}
            {/*    <div*/}
            {/*        className="flex flex-col items-center text-center mb-10 gap-10 bg-accent-foreground rounded-2xl p-8">*/}
            {/*        <em>*/}
            {/*            <blockquote className="font-serif text-[#D0E6FD] text-4xl leading-relaxed">*/}
            {/*                “ To become the global standard for digital document security and ownership verification by*/}
            {/*                building a trustless, decentralized ecosystem.”*/}
            {/*            </blockquote>*/}
            {/*        </em>*/}

            {/*    </div>*/}
            {/*    <div className="relative z-10 grid grid-cols-5 px-20 bac">*/}
            {/*        <div className="col-span-3">*/}
            {/*            <div className="flex flex-col gap-8">*/}
            {/*                <em>*/}
            {/*                    <p className="font-serif text-7xl leading text-[#162660] mb-5">*/}
            {/*                        Our Services*/}
            {/*                    </p>*/}
            {/*                </em>*/}
            {/*                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">*/}
            {/*                    What We Offer*/}
            {/*                </h2>*/}
            {/*                <div>*/}
            {/*                    <p className="font-medium cursor-pointer text-slate-600">*/}
            {/*                        Explore our range of services designed to enhance the security and management of*/}
            {/*                        your digital assets.*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-span-2">*/}
            {/*            <img src="src/assets/services_illustration.svg" alt="Services Illustration"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default AboutUsPage;
