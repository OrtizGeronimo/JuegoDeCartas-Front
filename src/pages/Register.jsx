import { useNavigate } from "react-router-dom";
import GenericForm from "../components/form/GenericForm";
import { register } from "../services/userService";
import { successSnackbar } from "../utils/snackbar";


export default function Register(){

    const navigate = useNavigate();

    const handleSubmit = async (formData, setFormError) => {

        try {
            const response = await register(formData);
            successSnackbar("Registro realizado con éxito")    
            navigate("/")
        } catch (error) {
            console.log("catch")
            setFormError({
                status: true,
                description: JSON.stringify(error.response.data.message)
            });
        }
           
    }

    return (
        <GenericForm onSubmit={handleSubmit} isLogin={false}/>
    )
}