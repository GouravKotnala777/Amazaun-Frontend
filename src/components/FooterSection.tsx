import React from "react";
import { NavLink } from "react-router-dom";


const FooterSection = ({heading, linksArray}:{heading:string; linksArray:{linkUrl:string; placeHolder:string;}[];}) => {

    return(
        <div className="footer_section_cont">
            <h2>{heading}</h2>
            {
                linksArray.map((item) => (
                    <div className="footer_link">
                        <NavLink to={`/${item.linkUrl}`}>{item.placeHolder}</NavLink>
                    </div>
                ))
            }
        </div>
    )
};

export default FooterSection;