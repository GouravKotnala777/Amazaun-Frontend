import { NavLink } from "react-router-dom";
import "../styles/accessbar.scss";
import { GoGoal } from "react-icons/go";
import { BiHome } from "react-icons/bi";
import { BsTag } from "react-icons/bs";
import { TbPercentage } from "react-icons/tb";

const AccessBar = ({homeCheck, visible}:{homeCheck:boolean; visible:boolean;}) => {

    return(
        <>
            <div className="access_bar_cont" style={{bottom:visible?"5px":"-55px", zIndex:homeCheck?"-1":"20"}}>
                <div className="access_bar_tools">
                    <NavLink to="/" className="access_bar_tool">
                        <div className="tool_icon"><BiHome /></div>
                        <div className="tool_heading">Home</div>
                    </NavLink>
                    <NavLink to="/" className="access_bar_tool">
                        <div className="tool_icon"><TbPercentage/></div>
                        <div className="tool_heading">Sale</div>
                    </NavLink>
                    <NavLink to="/" className="access_bar_tool">
                        <div className="tool_icon"><GoGoal /></div>
                        <div className="tool_heading">Goal</div>
                    </NavLink>
                    <NavLink to="/brands" className="access_bar_tool">
                        <div className="tool_icon"><BsTag /></div>
                        <div className="tool_heading">Brands</div>
                    </NavLink>
                </div>
            </div>
        </>
    )
};

export default AccessBar;