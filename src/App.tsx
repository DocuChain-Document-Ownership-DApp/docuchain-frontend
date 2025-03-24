import '@/App.css'
import AppRoutes from "@/routes/AppRoutes.tsx";
import {Toaster} from "sonner";

function App() {

    return (
        <>
            <AppRoutes/>
            <Toaster/>
        </>
    )
}

export default App
