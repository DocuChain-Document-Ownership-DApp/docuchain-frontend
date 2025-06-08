import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignInPage from "@/Features/SignIn/Pages/SignInPage.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import MainLayout from "@/Layouts/MainLayout.tsx";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import HomePage from "@/Features/Home/Pages/Home.tsx";
import SignUpPage from "@/Features/SignUp/Pages/SignUpPage.tsx";
import DocsPage from "@/Features/Docs/Pages/DocsPage.tsx";
import TransferPage from "@/Features/Transfer/Pages/TransferPage.tsx";
import LandingPage from "@/Features/Landing/Pages/LandingPage.tsx";
import AboutUsPage from "@/Features/AboutUs/Pages/AboutUs.tsx";
import VerifyPage from '@/Features/Verify/Pages/VerifyPage';

const AppRoutes: React.FC = () => {
    return (<>
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout><LandingPage/></MainLayout>}/>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/about_us" element={<MainLayout><AboutUsPage/></MainLayout>}/>
                    <Route path="/docs"
                           element={<ProtectedRoute><MainLayout><DocsPage/></MainLayout></ProtectedRoute>}/>
                    <Route path="/home"
                           element={<ProtectedRoute><MainLayout><HomePage/></MainLayout></ProtectedRoute>}/>
                    <Route path="/transfer"
                    element={<ProtectedRoute><MainLayout><TransferPage /></MainLayout></ProtectedRoute>} />
                <Route path="/verify"
                           element={<ProtectedRoute><MainLayout><VerifyPage/></MainLayout></ProtectedRoute>}/>
                </Routes>
            </Router>
            <Toaster/>
        </>
    );
};

export default AppRoutes;
