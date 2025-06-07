import '@/App.css'
import AppRoutes from "@/routes/AppRoutes.tsx";
import {Toaster} from "sonner";

function App() {

    return (
        <div className="font-[montserrat]">
            <AppRoutes/>
            <Toaster/>
        </div>
    )
}

export default App
