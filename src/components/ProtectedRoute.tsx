import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";


const ProtectedRoute = ({isUserloggedIn, isAdmin, children}:{isUserloggedIn:string; isAdmin?:boolean; children:ReactElement}) => {
    if (isAdmin) {        
        if (isUserloggedIn !== "admin") return <PageNotFound />
    }
    if (!isUserloggedIn) return <Navigate to={"/"} />
    
    return children;
};

export default ProtectedRoute;