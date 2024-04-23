import "./styles/login.scss";
import { ChangeEvent, useState } from "react";
import Form from "./components/Form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

interface RegisterFormTypes{
    name?:string;
    email?:string;
    password?:string;
    mobile?:string;
    role?:string;
}


const Register = () => {
    const formFields = [
        {type:"text", name:"name", placeHolder:"Name"},
        {type:"text", name:"email", placeHolder:"Email"},
        {type:"text", name:"password", placeHolder:"Password"},
        {type:"text", name:"mobile", placeHolder:"Mobile"},
        {type:"file", name:"avatar", placeHolder:"Avatar"}
    ];
    const [registerForm, setRegisterForm] = useState<RegisterFormTypes>();
    const [avatar, setAvatar] = useState<File|undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const inputChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "text") {
            setRegisterForm({...registerForm, [e.target.name]:e.target.value})
        }
        else if (e.target.type === "file") {
            if (e.target.files && e.target.files.length > 0) {
                console.log(e.target.files[0]);
                setAvatar(e.target.files[0]);
            }
        }
    };

    const register = async() => {
        setIsLoading(true);
        if (registerForm?.name && registerForm?.email && registerForm?.password && registerForm?.mobile) {
            const formData = new FormData();
            formData.append("name", registerForm?.name as string);
            formData.append("email", registerForm?.email as string);
            formData.append("password", registerForm?.password as string);
            formData.append("mobile", registerForm?.mobile as string);
            formData.append("avatar", avatar as File);
    
            try {
    
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/new`, {
                    method:"POST",
                    body:formData
                });
                const data = await res.json();
                
                console.log("----- AddProduct.tsx  AddNewProduct");
                console.log(data);
                console.log("----- AddProduct.tsx  AddNewProduct");
                setIsLoading(false);
    
                if (data.success) {
                    toast.success("Check Email Inbox for verification link", {
                        duration:2000,
                        position:"bottom-center"
                    });
                    setTimeout(() => {
                        navigate(`/forgetpassword/${registerForm?.email}`);
                    }, 2300);
                }
                else{
                    toast.error(data.message, {
                        duration:2000,
                        position:"bottom-center"
                    });
                }
            }
            catch(error){
                console.log(error);
                setIsLoading(false);
                toast.error("Error Occured", {
                    duration:3000,
                    position:"bottom-center"
                });
            }
        }
        else{
            console.log("All fields are required!");
            toast.error("All fields are required", {
                duration:2000,
                position:"bottom-center"
            });
            setIsLoading(false);
        }

    };

    return(
        <>
            <Toaster />
            <Form isLoading={isLoading} formHeading="Register" formFields={formFields} onChangeFunc={inputChangeHandler} onClickFunc={register} />
            <div className="login_links_cont">
                <div className="login_links">Already have account? <Link to="/login"> Login</Link></div>
            </div>
        </>
    )
};

export default Register;