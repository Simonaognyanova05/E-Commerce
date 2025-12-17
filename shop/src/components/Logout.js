import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Logout() {
    const navigate = useNavigate();
    const { onLogout } = useAuth();

    onLogout();
    navigate('/');
    return null;
}