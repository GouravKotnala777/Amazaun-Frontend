import { ChangeEvent, useState } from "react";
import Form from "./components/Form";

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
        if (avatar && registerForm?.name && registerForm?.email && registerForm?.password && registerForm?.mobile) {
            const formData = new FormData();
            formData.append("file", avatar);
            formData.append("upload_preset", "chat-app");
            formData.append("cloud_name", "dx4comsu3");

            try {
                const resAvatar = await fetch("https://api.cloudinary.com/v1_1/dx4comsu3/image/upload", {
                    method: "POST",
                    body: formData
                });
                const submittedAvatar = await resAvatar.json();

                if (submittedAvatar.secure_url) {
                    console.log("----Register.tsx  cloudinary");
                    console.log(submittedAvatar);
                    console.log("----Register.tsx  cloudinary");
                }else{
                    console.log("Failed to upload image to Cloudinary");
                }



                

                const res = await fetch("http://localhost:8000/api/v1/user/new", {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({name:registerForm?.name, email:registerForm?.email, password:registerForm?.password, mobile:registerForm?.mobile, avatar:submittedAvatar.url})
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log("----- AddProduct.tsx  AddNewProduct");
                    console.log(data);
                    console.log("----- AddProduct.tsx  AddNewProduct");
                    // Now you can extract the image URL from the Cloudinary res
                    // const imageUrl = data.secure_url;
                    // Do something with the imageUrl, like saving it in your database or displaying it in your UI
                } else {
                    console.log("Failed to Register User");

                }

            } catch (error) {
                console.error("Error From Register", error);
            }
        }
        else{
            console.log("All fields are required");
            console.log({name:registerForm?.name, email:registerForm?.email, password:registerForm?.password, mobile:registerForm?.mobile, avatar});
            
        }

    };

    return(
        <>
            <Form formHeading="Register" formFields={formFields} onChangeFunc={inputChangeHandler} onClickFunc={register} />
        </>
    )
};

export default Register;