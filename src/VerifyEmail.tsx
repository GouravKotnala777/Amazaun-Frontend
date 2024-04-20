import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./components/Loader";


"         http://127.0.0.1:5173/verifyemail?token=    adasdada&?emailtype=       asdasdas       "




const VerifyEmail = () => {
    const [token, setToken] = useState<string>("");
    const [emailType, setEmailType] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    // const {token, emailtype} = useParams();
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const navigate = useNavigate();

    const verifyUserEmail = async(newPassword:string|undefined) => {
        try {
            setIsProcessing(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/verifyemail?token=${token}`, {
            // const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/verifyemail`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({token, emailtype:emailType, newPassword})
            })

            const data = await res.json();

            console.log("--------  VerifyEmail.tsx  verifyUserEmail");
            console.log(data);
            if (data.success) {
                setVerified(true);
                navigate("/login");
            }
            console.log("--------  VerifyEmail.tsx  verifyUserEmail");
            setIsProcessing(false);
            
        } catch (error) {
            console.log("--------  VerifyEmail.tsx  verifyUserEmail");
            console.log(error);
            setError(true);
            console.log("--------  VerifyEmail.tsx  verifyUserEmail");
            setIsProcessing(false);
        }
    };


    useEffect(() => {
        const uri = window.location.search.split("=");
        setToken(uri[1].replace("&?emailtype", ""));
        setEmailType(uri[2]);
    }, [token, emailType]);
    useEffect(() => {
        console.log(token);
        if (emailType === "VERIFY") {
            verifyUserEmail("aaa");
        }
    }, [token]);

    return(
        <>
            <div style={{textAlign:"center"}}>
                <h3>{!token&&"No Token"}</h3>
                <h3>{!emailType&&"No emailType"}</h3>
                {
                    verified && (
                        <div>
                            <h3>Email Verified</h3>
                            <Link to="/login">
                                Login
                            </Link>
                        </div>
                    )
                }
                {
                    emailType === "RESET" ?
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <h2>Change Password</h2>
                            <input type="text" name="password" placeholder="New Password" style={{border:"1px solid #ff3153", outline:"none", borderRadius:"4px", margin:"10px auto", padding:"10px"}} onChange={(e) => setNewPassword(e.target.value)} />
                            <input type="text" name="confirm_password" placeholder="Confirm Password" style={{border:"1px solid #ff3153", outline:"none", borderRadius:"4px", margin:"10px auto", padding:"10px"}} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button style={{background:"linear-gradient(to bottom right, #ffb1be, #ff3153)", margin:"10px auto", border:"none", padding:"10px", color:"white", fontWeight:"bold", borderRadius:"4px", cursor:"pointer"}} onClick={() => {newPassword&&newPassword===confirmPassword&&verifyUserEmail(newPassword)}}>{isProcessing?<Loader size={13} borderWidth={3} color="#ff3153" />:"Reset Password"}</button>
                        </div>
                        :
                        <>
                        it is for verification
                        </>
                }
                {
                    error && (
                        <div>
                            <h3>Error Occured</h3>
                        </div>
                    )
                }
            </div>
        </>
    )
};

export default VerifyEmail;