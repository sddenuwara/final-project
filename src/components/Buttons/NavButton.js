import React from "react";
import { Link } from "react-router-dom/dist";
import Button from "react-bootstrap/Button";

function NavButton({to, text}) {
    return (
            <Link to={to}><Button>{text}</Button></Link>
        
    )
}

export default NavButton;