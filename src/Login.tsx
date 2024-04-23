import "./styles/login.scss";
import { ChangeEvent, useState } from "react";
import Form from "./components/Form";
import { userExist } from "./redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setLoginForm({...loginForm, [e.target.name]:e.target.value});
    };

    const login = async() => {
        setIsLoading(true);
        
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
            
            if (data.success) {
                if (data.message === "verify first") {
                    navigate(`/forgetpassword/${loginForm?.email}`);
                }
                else{
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
                    toast.success("Login Successful", {
                        duration:2000,
                        position:"bottom-center"
                    });
                    setTimeout(() => {
                        navigate("/");
                    }, 2300);
                }
            }
            else{
                console.log("----- Login.tsx  login");
                console.log(data.message);
                console.log("----- Login.tsx  login");
                toast.error(data.message, {
                    duration:2000,
                    position:"bottom-center"
                });
            }
            setIsLoading(false);
        } catch (error) {
            console.log("----- Login.tsx  login");
            console.log(error);
            console.log("----- Login.tsx  login");
            setIsLoading(false);
            toast.error("Error Occured", {
                duration:3000,
                position:"bottom-center"
            });
        }


    };



    return(
        <>
            <Toaster />
            <Form formHeading="Login" isLoading={isLoading} formFields={formFields} onChangeFunc={inputChangeHandler} onClickFunc={login} />
            <div className="login_links_cont">
                Don't have account?<Link to="/register" className="login_links">Register</Link> <span>Or </span>
                <Link to="/forgetpasswordpre" className="login_links">forget password?</Link>
            </div>
        </>
    )
};

export default Login;