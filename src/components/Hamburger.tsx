// import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/hamburger.scss";

const Hamburger = ({homeCheck, onClose}:{homeCheck:boolean; onClose:() => void}) => {
    // const [isHamActive, setIsHamActive] = useState<boolean>(false);

    return(
        <>
            <div className="hamburger_side_cont" style={{zIndex:"30"}}>
                <div className="hamburger_side">
                    {JSON.stringify(homeCheck)}
                    <NavLink to="/" className="ham_navlink" onClick={onClose}>Home</NavLink>
                    <NavLink to="/product/new" className="ham_navlink" onClick={onClose}>Add Product</NavLink>
                    <NavLink to="/register" className="ham_navlink" onClick={onClose}>Register</NavLink>
                    <NavLink to="/login" className="ham_navlink" onClick={onClose}>Login</NavLink>
                    <NavLink to="/logout" className="ham_navlink" onClick={onClose}>Logout</NavLink>
                    <NavLink to="/cart" className="ham_navlink" onClick={onClose}>Cart</NavLink>
                    <NavLink to="/logout" className="ham_navlink" onClick={onClose}>Logout</NavLink>
                    <NavLink to="/cart" className="ham_navlink" onClick={onClose}>Cart</NavLink>
                    <NavLink to="/logout" className="ham_navlink" onClick={onClose}>Logout</NavLink>
                    <NavLink to="/cart" className="ham_navlink" onClick={onClose}>Cart</NavLink>
                    <NavLink to="/logout" className="ham_navlink" onClick={onClose}>Logout</NavLink>
                    <NavLink to="/cart" className="ham_navlink" onClick={onClose}>Cart</NavLink>
                    <NavLink to="/logout" className="ham_navlink" onClick={onClose}>Logout</NavLink>
                    <NavLink to="/cart" className="ham_navlink" onClick={onClose}>Cart</NavLink>
                    <NavLink to="/logout" className="ham_navlink" onClick={onClose}>Logout</NavLink>
                    <NavLink to="/cart" className="ham_navlink" onClick={onClose}>Cart</NavLink>
                    <NavLink to="/logout" className="ham_navlink" onClick={onClose}>Logout</NavLink>
                    <NavLink to="/cart" className="ham_navlink" onClick={onClose}>Cart</NavLink>
                </div>
            </div>
        </>
    )
};

export default Hamburger;