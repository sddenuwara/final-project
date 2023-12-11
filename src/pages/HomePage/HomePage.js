import React from "react";

import NavButton from "../../components/Buttons/NavButton";

class HomePage extends React.Component {   
    render() {
        return (
            <main className="center" id="main">
                <h1>Please Login or Signup to Begin Budgeting</h1>
                <div className="buttons">
                    <NavButton to="/login" text="Login" />
                    <NavButton to="/signup" text="Signup" />
                </div>
            </main>
        )
    }    
}   

export default HomePage;
