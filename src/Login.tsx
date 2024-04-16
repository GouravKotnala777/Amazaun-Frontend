import { ChangeEvent, useState } from "react";
import Form from "./components/Form";
import { userExist } from "./redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

interface LoginFormTypes {
    email?:string;
    password?:string;
}

const Login = () => {
    const formFields = [
        {type:"text", name:"email", placeHolder:"User Email"},
        {type:"text", name:"password", placeHolder:"User Password"}
    ];
    const [loginForm, setLoginForm] = useState<LoginFormTypes>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setLoginForm({...loginForm, [e.target.name]:e.target.value});
    };

    const login = async() => {
        console.log(loginForm);
        
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/login`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email:loginForm?.email, password:loginForm?.password}),
                credentials:"include"
            });
    
            const data = await res.json();
            
            if (res.ok) {
                console.log("----- Login.tsx  login");
                console.log(data.user);
                dispatch(userExist({
                    _id:data.message._id,
                    name:data.message.name,
                    email:data.message.email,
                    role:data.message.role,
                    mobile:data.message.mobile,
                    avatar:data.message.avatar,
                    wishlistedProducts:data.message.wishlistedProducts,
                    reviewedProducts:data.message.reviewedProducts
                }));
                console.log("----- Login.tsx  login");
                navigate("/");
            }
            else{
                console.log("----- Login.tsx  login");
                console.log("Login Failed");
                console.log("----- Login.tsx  login");
            }
        } catch (error) {
            console.log("----- Login.tsx  login");
            console.log(error);
            console.log("----- Login.tsx  login");
        }


    };



    return(
        <>
            <Form formHeading="Login" formFields={formFields} onChangeFunc={inputChangeHandler} onClickFunc={login} />
            <Link to="/forgetpasswordpre">forget password</Link>
        </>
    )
};

export default Login;