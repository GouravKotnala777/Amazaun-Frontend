import { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPasswordPre = () => {
    const [email, setEmail] = useState<string>("");

    const forgetPasswordPre = async() => {
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
            console.log("--------  ForgetPasswordPre.tsx  forgetPasswordPre");
            
        } catch (error) {
            console.log("--------  ForgetPasswordPre.tsx  forgetPasswordPre");
            console.log(error);
            console.log("--------  ForgetPasswordPre.tsx  forgetPasswordPre");
        }
    };

    return(
        <>
            <h1>Your Email</h1>
            <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
            <Link to={`/forgetpassword/${email}`} onClick={forgetPasswordPre}>Next</Link>
        </>
    )
};

export default ForgetPasswordPre;