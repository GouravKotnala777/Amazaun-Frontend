import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import "./styles/app.scss"
import Header from "./components/Header"
import Cart from "./components/Cart"
import AddProduct from "./AddProduct"
import Login from "./Login"
import Register from "./Register"
import { useEffect, useState } from "react"
import Logout from "./Logout"
import { useDispatch, useSelector } from "react-redux"
import { InitialStateType, userExist } from "./redux/reducers/userReducer"
import SingleProduct from "./SingleProduct"
import Review from "./Review"
import Hamburger from "./components/Hamburger"
import { GiHamburgerMenu } from "react-icons/gi"
import { CgClose } from "react-icons/cg"
import Checkout from "./Checkout"
import Shipping from "./Shipping"
import NotFound from "./components/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import PageNotFound from "./components/PageNotFound"


function App() {
  const {payload} = useSelector((state:{userReducer:InitialStateType}) => state.userReducer);
  const [homeCheck, setHomeCheck] = useState<boolean>(false);
  const dispatch = useDispatch();



  const loggedInUser = async() => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/user/me", {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data = await res.json();

      console.log("------  App.tsx  loggedInUser");
      console.log(data);
      console.log("------  App.tsx  loggedInUser");
      if (data.message === "jwt expired") {
        const resRefreshToken = await fetch("http://localhost:8000/api/v1/user/refresh-token", {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include"
        });
  
        const dataRefreshToken = await resRefreshToken.json();
  
        console.log("------  App.tsx  inside (loggedInUser)");
        console.log(dataRefreshToken);
        console.log("------  App.tsx  inside (loggedInUser)");
      }
      
      
      dispatch(userExist({
        _id:data.message._id,
        name:data.message.name,
        email:data.message.email,
        role:data.message.role,
        mobile:data.message.mobile,
        avatar:data.message.avatar,
        wishlistedProducts:data.message.wishlistedProducts,
        reviewedProducts:data.message.reviewedProducts
      }));
      
    } catch (error) {
      console.log("------  App.tsx  loggedInUser");
      console.log(error);
      console.log("------  App.tsx  loggedInUser");
      
    }
  };

  useEffect(() => {
    if (homeCheck) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [homeCheck]);

  useEffect(() => {
    loggedInUser();
  }, []);

  return (
    <>
    {/* <button onClick={fetchLoggedInUser}>Fetch LoggedIn User</button>
    <pre>{JSON.stringify(loggedInUser, null, `\t`)}</pre> */}
      <BrowserRouter>
        <div className="ham_inp_wrapper" style={{left:homeCheck ? "0%" : "-76%", background:homeCheck ? "rgba(0, 0, 0, 0.672)" : "rgba(0, 0, 0, 0)", zIndex:homeCheck ? "21" : "19", transition:"0.5s"}}>
          <Hamburger homeCheck={homeCheck} onClose={() => setHomeCheck(false)} />
          <div className="ham_close_area" onClick={() => setHomeCheck(false)}>
            <CgClose className="CgClose" style={{display:homeCheck ? "block" : "none"}} />
          </div>
        </div>
        <GiHamburgerMenu className="GiHamburgerMenu" onClick={() => setHomeCheck(true)} style={{color:homeCheck ? "white" : "black", transition:"0.5s"}} />

        <Header payload={payload} />
        <Routes>
          <Route path="/" element={<Home homeCheck={homeCheck} />} />
          <Route path="/product/:productID" element={<SingleProduct homeCheck={homeCheck} />} />
          <Route path="/review/:productID" element={<Review />} />

        // If user is Admin
          <Route path="/product/new" element={<ProtectedRoute isUserloggedIn={payload?.role as string} isAdmin={true} children={<AddProduct />} />} />

        // If user is loggedout not if loggedin
          <Route path="/register" element={!payload?._id?<Register />:<NotFound subject="Page" />} />
          <Route path="/login" element={!payload?._id?<Login />:<NotFound subject="Page" />} />

        //  If user is loggedin not if loggedout
          <Route path="/logout" element={<ProtectedRoute isUserloggedIn={payload?.role as string} children={<Logout />} />} />
          <Route path="/cart" element={<ProtectedRoute isUserloggedIn={payload?.role as string} children={<Cart homeCheck={homeCheck} />} />} />
          <Route path="/pay" element={<ProtectedRoute isUserloggedIn={payload?.role as string} children={<Checkout />} />} />
          <Route path="/shipping" element={<ProtectedRoute isUserloggedIn={payload?.role as string} children={<Shipping />} />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
