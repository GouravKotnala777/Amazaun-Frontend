import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


"         http://127.0.0.1:5173/verifyemail?token=    adasdada&?emailtype=       asdasdas       "




const VerifyEmail = () => {
    const [token, setToken] = useState<string>("");
    const [emailType, setEmailType] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    // const {token, emailtype} = useParams();
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const verifyUserEmail = async(newPassword:string|undefined) => {
        try {
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
            }
            console.log("--------  VerifyEmail.tsx  verifyUserEmail");
            
        } catch (error) {
            console.log("--------  VerifyEmail.tsx  verifyUserEmail");
            console.log(error);
            setError(true);
            console.log("--------  VerifyEmail.tsx  verifyUserEmail");
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
            <div>
                <h1>Verify Email</h1>
                <h3>{token ? token : "No Token"}</h3>
                <h3>{emailType ? emailType : "No emailType"}</h3>
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
                        <>
                            <input type="text" name="password" onChange={(e) => setNewPassword(e.target.value)} />
                            <button onClick={() => newPassword&&verifyUserEmail(newPassword)}>Reset Password</button>
                        </>
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