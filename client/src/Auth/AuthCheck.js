import {useAuth} from "../Context/AuthContext";
import LoadingOverlay from "../Shared/LoadingOverlay";
import {Navigate} from "react-router-dom";

const AuthCheck = ({children}) => {
    const {isAuthenticated, loading} = useAuth();

    if(loading) {
        return <LoadingOverlay />
    }

    if(!isAuthenticated()) {
        return <Navigate to={"/"} />
    }

    return children;
}

export default AuthCheck;