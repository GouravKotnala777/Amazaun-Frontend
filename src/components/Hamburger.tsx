import "../styles/hamburger.scss";
import { NavLink } from "react-router-dom";
import { LoginedUserType } from "../redux/reducers/userReducer";

const Hamburger = ({onClose, payload}:{onClose:() => void; payload:LoginedUserType|null}) => {
    // const [isHamActive, setIsHamActive] = useState<boolean>(false);

    return(
        <>
            <div className="hamburger_side_cont" style={{zIndex:"30"}}>
                <div className="hamburger_side">
                    {
                        payload?.role === "admin" &&
                            <>
                                <div className="ham_nav_heading">
                                    Admin Routes
                                </div>
                                <div className="routes_cont">
                                    <NavLink to="/product/new" className="ham_navlink" onClick={onClose}>Add Product</NavLink>
                                    <NavLink to="/allorders" className="ham_navlink" onClick={onClose}>All Orders</NavLink>
                                </div>
                            </>
                    }
                    {
                        !payload?.name &&
                            <>
                                <span></span>
                                <div className="ham_nav_heading">
                                    
                                </div>
                                <div className="routes_cont">
                                    <NavLink to="/register" className="ham_navlink" onClick={onClose}>Register</NavLink>
                                    <NavLink to="/login" className="ham_navlink" onClick={onClose}>Login</NavLink>
                                </div>
                            </>
                    }
                    {
                        payload?.name && 
                            <>
                                <span></span>
                                
                                <div className="ham_nav_heading">
                                    User Routes
                                </div>
                                <div className="routes_cont">
                                    <NavLink to="/orders" className="ham_navlink" onClick={onClose}>Orders</NavLink>
                                    <NavLink to="/logout" className="ham_navlink" onClick={onClose}>Logout</NavLink>
                                    <NavLink to="/cart" className="ham_navlink" onClick={onClose}>Cart</NavLink>
                                </div>
                                <span></span>
                            </>
                    }
                </div>
            </div>
        </>
    )
};

export default Hamburger;