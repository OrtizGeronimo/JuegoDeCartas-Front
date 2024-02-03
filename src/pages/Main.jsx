import { useEffect } from "react";
import { getCurrentUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function Main(){
    
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const user = getCurrentUser()
        } catch (error) {
            navigate("/")
        }
    }
    
    useEffect(() => {
         fetchUser();
    }, [])


    return (navigate("/cards/config"))

}