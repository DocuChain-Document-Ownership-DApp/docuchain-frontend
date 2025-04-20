import React from 'react';
import AppNavBar from "@/components/AppNavBar.tsx";

interface MainLayoutProps {
    children: React.ReactNode; // Typing the children prop
}

const MainLayout: React.FC<MainLayoutProps> = ({children}: MainLayoutProps) => {

    return (
        <div className="p-10 w-screen mt-25">
            <AppNavBar/>
            <main>{children}</main>
        </div>
    );
};

export default MainLayout;
