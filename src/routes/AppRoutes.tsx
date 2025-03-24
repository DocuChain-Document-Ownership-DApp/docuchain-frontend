import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignInPage from "@/Features/SignIn/Pages/SignInPage.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import MainLayout from "@/Layouts/MainLayout.tsx";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import HomePage from "@/Features/Home/Pages/Home.tsx";
import SignUpPage from "@/Features/SignUp/Pages/SignUpPage.tsx";

const AppRoutes: React.FC = () => {
    return (<>
            <Router>
                <Routes>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="*" element={<SignInPage/>}/>
                    <Route path="/home"
                           element={<ProtectedRoute><MainLayout><HomePage/></MainLayout></ProtectedRoute>}/>
                </Routes>
            </Router>
            <Toaster/>
        </>
    );
};

export default AppRoutes;
