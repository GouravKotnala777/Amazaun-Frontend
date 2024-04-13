import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/logout.scss";
import { userExist } from "./redux/reducers/userReducer";
import { useDispatch } from "react-redux";

const Logout = () => {
    const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logoutHandler = async() => {
        try {
            if (checkBoxValue) {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/logout`, {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    credentials:"include"
                });
    
                const data = await res.json();
    
                console.log("-------- Logout.tsx  logout");
                console.log(data);
                console.log("-------- Logout.tsx  logout");

                dispatch(userExist(null));
                if (data.success) {
                    navigate("/");
                }
            }
            else{
                console.log("tick the field first");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div className="logout_cont">
                <h3>Do you want to Logout!</h3>
                <input type="checkbox" onChange={() => setCheckBoxValue(!checkBoxValue)} />
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </>
    )
};

export default Logout;