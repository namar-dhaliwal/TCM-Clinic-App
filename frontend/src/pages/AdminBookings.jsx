import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

// components
import LogoutButton from "../components/admin/LogoutButton";

const Admin = () => {
    const { user, logout } = useAuth0();

    const roles = user?.['https://tcm-clinic/roles'] || []
    if (!roles.includes('TCM Clinic Admin')) {
        logout()
        return <Navigate to="/admin/login" replace/>
    }

    return (
        <div>
            <LogoutButton />
        </div>
    );
}
 
export default Admin;