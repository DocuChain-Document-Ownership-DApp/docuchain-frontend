import React from 'react';
import AppNavBar from "@/components/AppNavBar.tsx";

interface MainLayoutProps {
    children: React.ReactNode; // Typing the children prop
}

const MainLayout: React.FC<MainLayoutProps> = ({children}: MainLayoutProps) => {

    return (
        <div className="p-4 w-screen mt-15">
            <AppNavBar/>
            <main>{children}</main>
        </div>
    );
};

export default MainLayout;
