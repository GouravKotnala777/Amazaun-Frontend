import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const [token, setToken] = useState<string>("");
    // const {email} = useParams();
    // const [userID, setUserID] = useState<string>("");
    // const [email, setEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    // const [verified, setVerified] = useState<boolean>(false);
    // const [error, setError] = useState<boolean>(false);

   

    const forgetPassword = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/verifyemail?token=${token}`, {
            // const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/ForgetPassword`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({token, newPassword})
            })

            const data = await res.json();

            console.log("--------  ForgetPassword.tsx  forgetPassword");
            console.log(data);
            // if (data.success) {
                // setVerified(true);
            // }
            console.log("--------  ForgetPassword.tsx  forgetPassword");
            
        } catch (error) {
            console.log("--------  ForgetPassword.tsx  forgetPassword");
            console.log(error);
            // setError(true);
            console.log("--------  ForgetPassword.tsx  forgetPassword");
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);
    useEffect(() => {
        console.log(token);
    }, [token]);

    return(
        <>
            <div>
                <h1>ForgetPassword</h1>
                <h3>{token ? token : "No Token"}</h3>
                <h3>Reset Password</h3>
                <input type="text" name="password" onChange={(e) => setNewPassword(e.target.value)} />
                <button onClick={forgetPassword}>Reset Password</button>
            </div>
        </>
    )
};

export default ForgetPassword;