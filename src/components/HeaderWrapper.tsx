import "../styles/header_wrapper.scss";
import { CgClose } from "react-icons/cg";
import Hamburger from "./Hamburger";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "./Header";
import { useSelector } from "react-redux";
import { InitialStateType } from "../redux/reducers/userReducer";
import { useEffect, useState } from "react";


const HeaderWrapper = ({homeCheckOn, homeCheckOff}:{homeCheckOn:()=>void; homeCheckOff:()=>void;}) => {
    const {payload} = useSelector((state:{userReducer:InitialStateType}) => state.userReducer);
    const [homeCheck, setHomeCheck] = useState<boolean>(false);



    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(currentScrollPos <= prevScrollPos);
        setPrevScrollPos(currentScrollPos);
      };


      if (!visible) {
        console.log(visible);
      }
      else{
        console.log(visible);
      }     
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);
  


















    // const aaa = () => {
        
    // }
    // useEffect(() => {
    //     window.addEventListener("scroll", aaa);
    // }, []);
    
    return(
        <>
            {/* <div className="header_wrapper_cont1" style={scrollTopPosition <= 90 ? {position:"relative"} : {position:"fixed"}}> */}
            {/* <div className="header_wrapper_cont1" style={{top:visible === false?`${scrollTopPosition-100}px`:`${scrollTopPosition}px`}}> */}
            <div className="header_wrapper_cont1" style={{ zIndex:homeCheck ? "21" : "20"}}>
              <div className="header_wrapper_cont2" style={{top:visible?"55px":"0px"}}>
                  {/* <div className="header_wrapper_cont2" style={{bottom:scrollTopPosition <= 64 ? `${scrollTopPosition}px` : "64px"}}> */}
                  {/* <div className="header_wrapper_cont2" style={{bottom:scrollTopPosition <= 64 ? `${scrollTopPosition}px` : "64px"}}> */}

                      <div className="ham_inp_wrapper" style={{left:homeCheck ? "-3%" : "-105%", background:homeCheck ? "rgba(0, 0, 0, 0.672)" : "rgba(0, 0, 0, 0)", transition:"0.5s"}}>
                          <Hamburger payload={payload} onClose={() => {setHomeCheck(false); homeCheckOff()}} />
                          <div className="ham_close_area" onClick={() => {setHomeCheck(false); homeCheckOff()}}>
                              <CgClose className="CgClose" style={{display:homeCheck ? "block" : "none"}} />
                          </div>
                      </div>
                      <GiHamburgerMenu className="GiHamburgerMenu" onClick={() => {setHomeCheck(true); homeCheckOn()}} style={{color:homeCheck ? "white" : "black", transition:"0.5s"}} />
                      <Header payload={payload} />
              
              </div>
            </div>
        </>

    )
};

export default HeaderWrapper;