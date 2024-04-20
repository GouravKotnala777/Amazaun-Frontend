import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./components/Loader";

const ForgetPasswordPre = () => {
    const [email, setEmail] = useState<string>("");
    const [emailResult, setEmailResult] = useState<{success:boolean; message:string;}>();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const navigate = useNavigate();

    const forgetPasswordPre = async() => {
        setIsProcessing(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/forgetpasswordpre`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({email})
            })

            const data = await res.json();

            console.log("--------  ForgetPasswordPre.tsx  forgetPasswordPre");
            console.log(data);

            setEmailResult(data);

            if (data.success) {
                navigate(`/forgetpassword/${email}`);
            }
            else{
                navigate(`/forgetpasswordpre`);
            }

            
            
            console.log("--------  ForgetPasswordPre.tsx  forgetPasswordPre");
            setIsProcessing(false);
            
        } catch (error) {
            console.log("--------  ForgetPasswordPre.tsx  forgetPasswordPre");
            console.log(error);
            console.log("--------  ForgetPasswordPre.tsx  forgetPasswordPre");
            setIsProcessing(false);
        }
    };

    return(
        <div style={{margin:"30px auto", textAlign:"center"}}>
            <h3>Enter Email for verification</h3>
            <p>A verification link will receive in this email address</p>
            <input type="text" name="email" placeholder="Email" style={{outline:"none", border:"1px solid #ff3153", padding:"10px", borderRadius:"4px"}} onChange={(e) => setEmail(e.target.value)} />
            <button style={{width:"50px", display:"block", background:"#ff3153", margin:"20px auto", borderRadius:"4px", textDecoration:"none", color:"white", padding:"5px 10px", border:"none"}} onClick={forgetPasswordPre}>{isProcessing?<Loader size={13} borderWidth={3} color="#ff3153" />:"Next"}</button>
            {emailResult?.success === false&&<h2>{emailResult?.message}</h2>}
        </div>
    )
};

export default ForgetPasswordPre;