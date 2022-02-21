import React from "react";
import logo from "../../../styles/images_mobile/logo.png";
import hamburger from "../../../styles/images_mobile/hamburger.png";
import "../../../styles/mobile/nav.css";

function NavMobile() {
    return (
        <div className="nav_container">
            <div className="nav_wrapper">
                <div className="nav_logo">
                    <img src={logo} alt="logo" id="nav_logo" />
                </div>
                <div className="nav_hamburger">
                    <img src={hamburger} alt="logo" id="nav_hamburger" />
                </div>
            </div>
        </div>
    );
}

export default NavMobile;
