import {DocumentIssueContainer} from "@/Features/Home/Components/Functional/DocumentIssueContainer.tsx";
import {Card} from "@/components/ui/card.tsx";

const HomePage = () => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Card className="p-4 shadow-none bg-[#162660] z-1">
                <em>
                    <h1 className="font-serif text-neutral-100">Welcome to the New Age of Document Storage</h1>
                </em>
            </Card>
            <Card className="p-4 z-1 bg-transparent backdrop-blur-sm">
                <DocumentIssueContainer/>
            </Card>
        </div>
    )
}

export default HomePage;