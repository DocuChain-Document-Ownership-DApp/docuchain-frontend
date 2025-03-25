import {DocumentIssueContainer} from "@/Features/Home/Components/Functional/DocumentIssueContainer.tsx";
import {Card} from "@/components/ui/card.tsx";
import {DocumentSearchContainer} from "@/Features/Home/Components/Functional/DocumentSearchContainer.tsx";

const HomePage = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card className="p-4 shadow-none bg-[#D0E6FD] w-full z-1">
                <em>
                    <h1 className="font-serif text-center text-[#162660]">
                        Welcome to the New Age of Document Storage
                    </h1>
                </em>
            </Card>
            <Card className="p-4 mt-4 bg-transparent backdrop-blur-sm shadow-none">
                <DocumentIssueContainer/>
            </Card>
            <DocumentSearchContainer/>
        </div>
    )
}

export default HomePage;