import React from "react";
import { Link } from "react-router-dom/dist";

function Menu() {
  return (
    <nav>
        <ul>
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/login">Login</Link></li>
            <li className="nav-item"><Link to="/signup">Signup</Link></li>
            <li className="nav-item"><Link to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link to="/configure">Configure</Link></li>
            <li><Link to="/add-expense">Add Expense</Link></li>
        </ul>
    </nav>
  );
}

export default Menu;
