import "../styles/header.scss";
import { NavLink } from "react-router-dom";
import logo from "/logo192.png";
import { LoginedUserType } from "../redux/reducers/userReducer";
// import Hamburger from "./Hamburger";


function Header({payload}:{payload:LoginedUserType|null}) {

  return (
    <>
        <div className="header_cont">
          <span className="user_name_mobile">
            {payload?.name ? `Hi ${payload?.name}` : <NavLink to="/login" className="header_navlink">Login</NavLink>}
          </span>
          <NavLink to="/" className="header_navlink">
            <img src={logo} alt={logo} />
          </NavLink>

          
          <div className="navbar_cont">
            <span className="user_name_pc">{payload?.name && `Hi ${payload?.name}`}</span>
            {
              payload?.role === "admin" &&
                <NavLink to="/product/new" className="header_navlink">Add Product</NavLink>
            }
            {
              !payload?.name &&
              <>
                <NavLink to="/register" className="header_navlink">Register</NavLink>
                <NavLink to="/login" className="header_navlink">Login</NavLink>
              </>
            }
            {
              payload?.name && 
              <>
                <NavLink to="/logout" className="header_navlink">Logout</NavLink>
                <NavLink to="/cart" className="header_navlink">Cart</NavLink>
              </>
            }
          </div>
        </div>
    </>
  )
}

export default Header
