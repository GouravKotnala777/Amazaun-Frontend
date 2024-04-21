import { useParams } from "react-router-dom";

const ForgetPassword = () => {
    const {email} = useParams();

    return(
        <div style={{color:"#313131", maxWidth:"300px", margin:"20px auto", textAlign:"center"}}>
            <h2>Request to change password</h2>
            <h3 style={{textAlign:"justify"}}>A link has been sent to this <span style={{color:"#ff3153"}}>{email}</span> email account first you need to verify it's you.</h3>
        </div>
    )
};

export default ForgetPassword;