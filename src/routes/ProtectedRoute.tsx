import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const authToken = useSelector((state: RootState) => state.auth.accessToken);

    if (!authToken) {
        return <Navigate to="/signin"/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
