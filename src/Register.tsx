import "./styles/login.scss";
import { ChangeEvent, useState } from "react";
import Form from "./components/Form";
import { Link } from "react-router-dom";

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
        // if (avatar && registerForm?.name && registerForm?.email && registerForm?.password && registerForm?.mobile) {
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
        }
        catch(error){
            console.log(error);            
        }

    };

    return(
        <>
            <Form formHeading="Register" formFields={formFields} onChangeFunc={inputChangeHandler} onClickFunc={register} />
            <div className="login_links_cont">
                <div className="login_links">Already have account? <Link to="/login"> Login</Link></div>
            </div>
        </>
    )
};

export default Register;