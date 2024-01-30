
import { useNavigate } from "react-router-dom"; 
import { login } from "../services/userService";
import GenericForm from "../components/form/GenericForm";



export default function Main(){


    const navigate = useNavigate();


    const handleSubmit = async (formData, setFormError) => {

        try {
            const response = await login(formData);    
            navigate("/config")
        } catch (error) {
            console.log("catch")
            setFormError({
                status: true,
                description: JSON.stringify(error.response.data.message)
            });
        }
           
    }

    return (
        <GenericForm onSubmit={handleSubmit} isLogin={true}/>
    )
}